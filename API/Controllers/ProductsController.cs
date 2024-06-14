using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet] // api/products -- products is coming from the controller name
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")] // api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // this returned null, so the error was 204 - no content, which is not expectd behaviour
            // as our requested product does't exist, so not found should be sent
            // return await _context.Products.FindAsync(id);
            var product =  await _context.Products.FindAsync(id);
            if (product ==null) return NotFound();
            return product;
        }
    }
}