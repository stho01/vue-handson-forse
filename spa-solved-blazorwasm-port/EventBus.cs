namespace Forse.Shop;

public static class EventBusEvents
{
    public const string DisplayNotification = "display-notification";
}

public class EventBus
{
    private readonly Dictionary<string, List<EventData>> _eventTable = new();

    public void On(string eventName, Action<object> listener)
    {
        if (!_eventTable.ContainsKey(eventName))
            _eventTable.Add(eventName, new List<EventData>());

        var data = new EventData(eventName, listener, false);
        
        _eventTable[eventName].Add(data);
    }

    public void Once(string eventName, Action<object> listener)
    {
        if (!_eventTable.ContainsKey(eventName))
            _eventTable.Add(eventName, new List<EventData>());

        var data = new EventData(eventName, listener, true);
        
        _eventTable[eventName].Add(data);
    }

    public void Off(string eventName)
    {
        if (!_eventTable.ContainsKey(eventName)) 
            return;

        _eventTable[eventName].Clear();
    }
    
    public void Off(string eventName, Action<object> listener)
    {
        if (!_eventTable.ContainsKey(eventName)) 
            return;

        var data = _eventTable[eventName].FirstOrDefault(data => data.Listener == listener);
        if (data == null)
            return;
        
        _eventTable[eventName].Remove(data);
    }

    public void Emit(string eventName, object data)
    {
        if (!_eventTable.ContainsKey(eventName)) 
            return;

        foreach (var eventData in _eventTable[eventName])
            eventData.Listener(data);

        _eventTable[eventName].RemoveAll(eventData => eventData.IsOnce);
    }

    private record EventData(string EventName, Action<object> Listener, bool IsOnce);
}    
