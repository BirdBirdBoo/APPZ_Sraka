﻿using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Repositories;

public interface IAnalysisRepository
{
    Task<AnalysisEntity?> CreateAnalysis(PatientId patiendId, string name, string description, string type, DateTime date, string provider, string data, CancellationToken cancellationToken);

    Task<AnalysisEntity?> GetAnalysis(AnalysisId id, CancellationToken cancellationToken);

    Task<IEnumerable<AnalysisPreviewDto>> GetAllAnalyzes(PatientId patientId, CancellationToken cancellationToken);
    IQueryable<AnalysisEntity> GetAllAnalyzesQueryable();
}
