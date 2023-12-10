using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;

namespace Server.Repositories;

internal class DbImageRepository : IImageRepository
{
    private readonly AppDbContext _dbContext;

    public DbImageRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ImageEntity> CreateImage(string title, string url, string[] tags, CancellationToken ct)
    {
        var id = ImageId.New();

        var entity = new ImageEntity(id, title, url, tags);

        _dbContext.Add(entity);

        await _dbContext.SaveChangesAsync(ct);

        return entity;
    }

    public async Task<IEnumerable<ImageEntity>> GetImages(CancellationToken ct)
    {
        return await _dbContext.Images.ToListAsync(ct);
    }

    public async Task<ImageEntity?> UpdateImage(ImageId id, string title, string url, string[] tags, CancellationToken ct)
    {
        var image = await FindImageById(id, ct);

        if (image is null)
        {
            return null;
        }

        image.Title = title;
        image.Url = url;
        image.Tags = tags;

        var entityEntry = _dbContext.Update(image);

        await _dbContext.SaveChangesAsync(ct);

        return entityEntry.Entity;
    }

    public async Task<bool> DeleteImage(ImageId id, CancellationToken ct)
    {
        var image = await FindImageById(id, ct);

        if (image is null)
        {
            return false;
        }

        _dbContext.Images.Remove(image);

        await _dbContext.SaveChangesAsync(ct);

        return true;
    }

    private async Task<ImageEntity?> FindImageById(ImageId id, CancellationToken ct)
    {
        return await _dbContext.Images.FindAsync(new object?[] {id}, cancellationToken: ct);
    }
}