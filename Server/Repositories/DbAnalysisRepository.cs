using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;

namespace Server.Repositories
{
    public class DbAnalysisRepository : IAnalysisRepository
    {
        private readonly QualityLifeDbContext _appDbContext;

        public DbAnalysisRepository(QualityLifeDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<AnalysisEntity?> CreateAnalysis(string name, string description, string type, DateTime date, string provider, string data, CancellationToken cancellationToken)
        {
            var analysisEntity = new AnalysisEntity
            {
                Name = name,
                Description = description,
                Type = type,
                Date = date,
                Provider = provider,
                Data = data,
            };

            await _appDbContext.Analyzes.AddAsync(analysisEntity);

            return analysisEntity;
        }

        public async Task<IEnumerable<AnalysisEntity>> GetAllAnalyzes(CancellationToken cancellationToken)
        {
            return await _appDbContext.Analyzes.ToListAsync();
        }

        public IQueryable<AnalysisEntity> GetAllAnalyzesQueryable()
        {
            return _appDbContext.Analyzes.Where(a => true);
        }

        public async Task<AnalysisEntity?> GetAnalysis(AnalysisId id, CancellationToken cancellationToken)
        {
            return await _appDbContext.Analyzes.FirstAsync(a => a.AnalysisId.Equals(id));
        }
    }
}
