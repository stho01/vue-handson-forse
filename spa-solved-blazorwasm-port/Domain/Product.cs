namespace Forse.Shop.Domain;

public class Product
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public float Weight { get; set; }
}

public class ProductName
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}