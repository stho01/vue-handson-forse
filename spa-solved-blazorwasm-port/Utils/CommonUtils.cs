namespace Forse.Shop.Utils;

public static class CommonUtils
{
    public static void SetTimeout(Action callback, int milliseconds)
    {
        if (milliseconds <= 0)
            return;
        
        Task.Run(async () => {
            await Task.Delay(milliseconds);
            
            try
            {
                callback();
            } 
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        });
    }
}