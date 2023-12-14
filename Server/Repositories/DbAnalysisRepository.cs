using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Extensions;
using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Repositories;

public class DbAnalysisRepository : IAnalysisRepository
{
    private readonly QualityLifeDbContext _appDbContext;

    public DbAnalysisRepository(QualityLifeDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<AnalysisEntity?> CreateAnalysis(PatientId patiendId,
                                                      string name,
                                                      string description,
                                                      string type,
                                                      DateTime date,
                                                      string provider,
                                                      string data,
                                                      CancellationToken cancellationToken)
    {
        var result = _appDbContext.Analyzes.Add(new AnalysisEntity
        {
            AnalysisId = AnalysisId.New(),
            Patient = _appDbContext.Patients.FirstOrDefault(p => p.PatientId.Equals(patiendId)),
            Name = name,
            Description = description,
            Type = type,
            Date = date,
            Provider = provider,
            Data = data,
        });
        ;

        await _appDbContext.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<IEnumerable<AnalysisPreviewDto>> GetAllAnalyzes(CancellationToken cancellationToken)
    {
        var analyzes = await _appDbContext.Analyzes
                                          .Select(a => a.ToPreview())
                                          .ToListAsync();
        return analyzes;
    }

    public IQueryable<AnalysisEntity> GetAllAnalyzesQueryable()
    {
        return _appDbContext.Analyzes.Where(a => true);
    }

    public async Task<AnalysisEntity?> GetAnalysis(AnalysisId id, CancellationToken cancellationToken)
    {
        return await _appDbContext.Analyzes.Include(a => a.Patient)
                                  .FirstAsync(a => a.AnalysisId.Equals(id), cancellationToken: cancellationToken);
    }
}