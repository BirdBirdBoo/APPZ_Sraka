namespace Server.Extensions.Swagger;

[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
internal class DefaultValueAttribute : Attribute
{
    public DefaultValueAttribute(string param, string value)
    {
        Parameter = param;
        Value = value;
    }

    public string Parameter { get; }

    public string Value { get; }
}