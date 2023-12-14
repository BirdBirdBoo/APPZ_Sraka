using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Repositories
{
    public interface IChartsRepository
    {
        ChartEntity Create(CreateChartRequest createChartRequest);
        ChartEntity Get(int id);
        IEnumerable<ChartEntity> GetAllForPatient(PatientId patientId);
        IQueryable<ChartEntity> GetAllChartsQueryable();
    }
}
