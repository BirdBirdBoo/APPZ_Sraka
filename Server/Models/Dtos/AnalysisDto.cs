﻿namespace Server.Models.Dtos
{
    public class AnalysisDto
    {
        public string? NameOfProperty { get; set; }
        public double Number { get; set; }
        public string? Metric { get; set; }
        public double Delta { get; set; }
    }
}
