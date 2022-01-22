using System.Text;
using Forse.Shop.Domain;

namespace Forse.Shop.Api;

public interface IProductApi
{
    Task<ProductName[]> GetProductsAsync();
    Task<Product[]> GetProductsWithWeightAsync();
    Task<Product> GetProductAsync(string id);
    Task UpsertProductAsync(Product product);
}

/// NOTE:
/// Dummy store that stores product locally on the client..
/// This is ofc meant to be stored by backend and preferably in some kind of database. :)   
public class ProductApi : IProductApi
{
    //**********************************************************
    //** fields:
    //**********************************************************

    private readonly List<Product> _products = new()
    {
        new() { Id = "AAA123", Name = "Melk", Weight = 1 },
        new() { Id = "AAA126", Name = "Brød", Weight = 0.6f },
        new() { Id = "AAA128", Name = "Ketchup", Weight = 1.5f }
    };
    private readonly Random _random = new();

    //**********************************************************

    public async Task<ProductName[]> GetProductsAsync()
    {
        await Task.Delay(1000); // to simulate data transfer over network.
        
        return _products.Select(product => new ProductName
        {
            Id = product.Id, 
            Name = product.Name
        }).ToArray();
    }

    //**********************************************************

    public async Task<Product[]> GetProductsWithWeightAsync()
    {
        await Task.Delay(1000); // to simulate data transfer over network.

        return _products.ToArray();
    }

    //**********************************************************

    public async Task<Product> GetProductAsync(string id)
    {
        await Task.Delay(1000); // to simulate data transfer over network.

        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
            throw new Exception($"Produktet med id {id} finnes ikke.");

        return product;
    }

    //**********************************************************

    public async Task UpsertProductAsync(Product product)
    {
        await Task.Delay(1000); // to simulate data transfer over network.

        var existing = _products.FirstOrDefault(p => p.Id == product.Id);
        
        if (existing == null)
        {
            if (product.Id == "") 
                product.Id = GenerateProductId();
            
            _products.Add(product);
        }
        else
        {
            existing.Name = product.Name;
            existing.Weight = product.Weight;
        }
    }

    //**********************************************************

    private string GenerateProductId()
    {
        var code = new StringBuilder();
        var no = new StringBuilder();

        for (var i = 0; i < 3; i++) {
            
            code.Append((char)_random.Next(65, 90));
            no.Append(_random.Next(10));
        }

        return $"{code}{no}";
    }
}