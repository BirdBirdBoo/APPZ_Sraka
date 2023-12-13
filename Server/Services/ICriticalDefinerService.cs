using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Services
{
    public interface ICriticalDefinerService
    {
        IEnumerable<AnalysisDto> Define(AnalysisEntity analysis);
    }
}
