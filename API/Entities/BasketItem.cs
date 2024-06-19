using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    // name of our table, by default entity creates table name same 
    //as the class name but if we want something different we can do this!!
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        public int ProductId { get; set; }

        // this is to indicate the ProductId is coming from Product (<PropertyName>Id is coming from <PropertyName>)
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}