using Server.Models.Entities;
using Server.Services;

namespace ServerTests.ServiceTests
{
    public class CriticalDefinerServiceTests
    {
        [Fact]
        public void Define_AnalysisDto()
        {
            AnalysisEntity analysisEntity = new() 
            {
                Name = "BloodTest",
                Date = new DateTime(2023, 11, 26),
                Type = "Full",
                Data = "[\r\n  {\r\n    \"nameOfProperty\": \"MCV\",\r\n    \"number\": 12.3,\r\n    \"metric\": \"фл\"\r\n  },\r\n  {\r\n    \"nameOfProperty\": \"WBC\",\r\n    \"number\": 7500.0,\r\n    \"metric\": \"/мкл\"\r\n  }\r\n]"
            };
            ICriticalDefinerService criticalDefinerService = new CriticalDefinerServiceMocked();
            
            var dto = criticalDefinerService.Define(analysisEntity);

            Assert.True(dto.Any(d => d.Delta != 0));
        }
    }
}
