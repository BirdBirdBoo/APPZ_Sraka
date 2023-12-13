using Microsoft.EntityFrameworkCore;
using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Services;

namespace Server.Extensions;

public static class FilterExtensions
{
    public static IQueryable<AnalysisEntity> FilterByDate(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        var result = analysises;

        if (analysisFilterRequest.FirstDate != null)
        {
            result = result.Where(a => a.Date >= analysisFilterRequest.FirstDate);
        }

        if (analysisFilterRequest.LastDate != null)
        {
            result = result.Where(a => a.Date <= analysisFilterRequest.LastDate);
        }
        return result;
    }

    public static IQueryable<AnalysisEntity> FilterByName(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        if (analysisFilterRequest.Name == null)
        {
            return analysises;
        }

        return analysises.Where(a => a.Name == analysisFilterRequest.Name);
    }
    public static IQueryable<AnalysisEntity> FilterByPatient(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        if (analysisFilterRequest.PatientId.Equals(PatientId.Empty))
        {
            return analysises;
        }

        return analysises.Where(a => a.Patient.PatientId.Equals(analysisFilterRequest.PatientId));
    }


    public static IQueryable<AnalysisEntity> FilterByType(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        if (analysisFilterRequest.Type == null)
        {
            return analysises;
        }

        return analysises.Where(a => a.Type == analysisFilterRequest.Type);
    }

    public static async Task<(IEnumerable<AnalysisPreviewDto>, IEnumerable<IEnumerable<AnalysisDto>>?)> SelectOnlyBeyondNorm(
        this IQueryable<AnalysisEntity> analysises, 
        AnalysisFilterRequest analysisFilterRequest, 
        ICriticalDefinerService criticalDefinerService)
    {
        if (!analysisFilterRequest.OnlyBeyondNorm)
        {
            var list = await analysises.ToListAsync();
            return (list.Select(a => a.ToPreview()), null);
        }

        var fetchedAnalyzes = await analysises.ToListAsync();

        var analyzesBeyondNorm = new List<AnalysisEntity>();
        var analysisProps = new List<IEnumerable<AnalysisDto>>();

        foreach (var analysis in fetchedAnalyzes)
        {
            var definedAnalysis = criticalDefinerService.Define(analysis);
            if(definedAnalysis.Any(d => d.IsCritical))
            {
                analyzesBeyondNorm.Add(analysis);
                analysisProps.Add(definedAnalysis);
            }
        }

        var previews = analyzesBeyondNorm.Select(a => a.ToPreview());
        return (previews, analysisProps);
    }

    public static IQueryable<AnalysisEntity> OrderByDate(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        var result = analysises;

        switch (analysisFilterRequest.OrderByDateType)
        {
            case OrderByDateType.Ascending:
                result = result.OrderBy(a => a.Date);
                return result;
            case OrderByDateType.Descending:
                result = result.OrderBy(a => a.Date).Reverse();
                return result;
            default:
                return result;
        }
    }
}
