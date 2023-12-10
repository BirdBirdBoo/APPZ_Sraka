using System.Reflection;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Server.Extensions.Swagger;

internal class AddDefaultValueOperation : IOperationFilter
{
    void IOperationFilter.Apply(OpenApiOperation operation, OperationFilterContext operationFilterContext)
    {
        if (operation.Parameters == null || !operation.Parameters.Any())
        {
            return;
        }

        var attributes = operationFilterContext.MethodInfo.GetCustomAttributes<DefaultValueAttribute>()
                                               .ToList();

        if (!attributes.Any())
        {
            return;
        }

        foreach (var parameter in operation.Parameters)
        {
            var attr = attributes.FirstOrDefault(it => it.Parameter == parameter.Name);

            if (attr is not null)
            {
                parameter.Example = new OpenApiString(attr.Value);
            }
        }
    }
}