namespace Forse.Shop.Domain;

public class ShoppingList
{
    public string? Id { get; set; }
    public List<ShoppingEntry> Entries { get; } = new();

    public void Add(ProductName product)
    {
        var stored = Entries.FirstOrDefault(e => e.Product.Id == product.Id);
        if (stored == null)
        {
            var entry = new ShoppingEntry(product);
            Entries.Add(entry);
            stored = entry;
        }
        stored.Amount++;
    }

    public bool Remove(ProductName productName)
    {
        var stored = Entries.FirstOrDefault(e => e.Product.Id == productName.Id);
        if (stored == null)
            throw new ApplicationException($"Cannot remove product {productName.Name} ({productName.Id}). Product was not found");

        Entries.Remove(stored);
        return true;
    }
}


public class ShoppingEntry
{
    public ShoppingEntry(ProductName product)
    {
        Product = product;
    }

    public ProductName Product { get; }
    public int Amount { get; set; }
}
