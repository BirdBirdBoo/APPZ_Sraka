namespace Server.Models.Entities;

public class ChartEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public PatientId PatientId { get; set; }
    public DayChartProperties[] Properties { get; set; } = null!;
}

public record DayChartProperties(
    double amount,
    string metric,
    int hourOfDay
);

public record CreateChartRequest(
    string name,
    DateTime date,
    PatientId patientId,
    DayChartProperties[] properties
);

