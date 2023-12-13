using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Extensions
{
    public static class ConvertExtensions
    {
        public static AnalysisPreviewDto ToPreview(this AnalysisEntity a)
        {
            return new AnalysisPreviewDto(a.AnalysisId, a.Name!, a.Description!, a.Type!, a.Date);
        }
        
    }
}
