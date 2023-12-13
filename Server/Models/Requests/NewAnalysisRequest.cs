using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Models.Requests;

public record NewAnalysisRequest(
    PatientId patientId,
    string name,
    string description,
    string type,
    DateTime date,
    string provider,
    IEnumerable<NewAnalysisDto> data
    );
