namespace Server.Models.Requests;

public enum OrderByDateType
{
    Ascending,
    Descending
}

public class AnalysisFilterRequest
{
    public string? Name { get; set; }
    public DateTime? FirstDate { get; set; }
    public DateTime? LastDate { get; set; }
    public string? Type { get; set; }
    public bool OnlyBeyondNorm { get; set; } = false;
    public OrderByDateType OrderByDateType { get; set; } = OrderByDateType.Descending;
}
