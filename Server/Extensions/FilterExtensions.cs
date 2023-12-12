using Server.Models.Entities;
using Server.Models.Requests;

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

    public static IQueryable<AnalysisEntity> FilterByType(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        if (analysisFilterRequest.Type == null)
        {
            return analysises;
        }

        return analysises.Where(a => a.Type == analysisFilterRequest.Type);
    }

    //todo implement
    public static IQueryable<AnalysisEntity> SelectOnlyBeyondNorm(this IQueryable<AnalysisEntity> analysises, AnalysisFilterRequest analysisFilterRequest)
    {
        if (!analysisFilterRequest.OnlyBeyondNorm)
        {
            return analysises;
        }

        return analysises.Where(a => a.Type == analysisFilterRequest.Type);
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
