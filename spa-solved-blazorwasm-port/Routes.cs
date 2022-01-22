namespace Forse.Shop;

public static class Routes
{
    public const string Home = "/";
    public const string Products = "/products";
    public const string NewProduct = "/products/new";
    public static string Product(string id) => $"/products/{id}";
    public const string ShoppingCart = "/shopping-list";
}