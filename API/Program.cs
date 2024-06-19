using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<StoreContext>(opt =>
{
    // we downloaded the nuget package for sqlite
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


var app = builder.Build();



// ------ Middleware -------

// methods starting with Use, Map and Run are usually middleware implementing the async next - calls the next middleware, context - arguents that are sent to the middleware
//look below for example -- 
// next is of type RequestDelegate and context is HttpContext
app.Use(async (context, next) =>
{
    var start = DateTime.Now;
    await next.Invoke(context); // passing context to the next middleware - we dont need to know the next middlewares
    app.Logger.LogInformation($"Request body - {context.Request.Body}\nRequest path - {context.Request.Path}\nRequest Headers - {context.Request.Headers} :{(DateTime.Now - start).TotalMilliseconds}ms- time taken");
});

// Delegate - A type safe equivalent to function pointer
// Action - A specific delegate where functions don't have a return type
// ActionResult - This is specific to ASP.NET, it is the return type for action functions(functions handling requests in a controller)
// Task / Task<T> - It is used for fucntions which are asynchronous
// Event - it is build on top of delegate, which alows subscribers to know about an event !! needs further reading !!!


// Line added later to add middleware
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// we removed https from launchSettings, 
// thus removing this will not throw "Failed to determine the https port for redirect."
// app.UseHttpsRedirection();

// this sets the Access Cross Site origin of the response header, thus the browser doesn't block it
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});
// middleware for authorization
app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occured bruvvv!!!");
}

app.Run();
