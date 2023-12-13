using Server.Models.Entities;

namespace Server.Models.Requests;

public enum OrderByDateType
{
    Descending,
    Ascending
}

public class AnalysisFilterRequest
{
    public PatientId PatientId { get; set; }
    public string? Name { get; set; }
    public DateTime? FirstDate { get; set; }
    public DateTime? LastDate { get; set; }
    public string? Type { get; set; }
    public bool OnlyBeyondNorm { get; set; } = false;
    public OrderByDateType OrderByDateType { get; set; } = OrderByDateType.Descending;
}
