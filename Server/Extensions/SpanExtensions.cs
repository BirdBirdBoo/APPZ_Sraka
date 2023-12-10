namespace Server.Extensions;

public static class SpanExtensions
{
    public static bool Any<TValue>(this ReadOnlySpan<TValue> span, Predicate<TValue>? predicate = null)
    {
        predicate ??= _ => true;

        foreach (var val in span)
            if (predicate(val))
            {
                return true;
            }

        return false;
    }
}