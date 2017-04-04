
public enum logStatus : Int {
    case Cached
    case Logged
    case LoggedAsGeneric
}

// Singleton ? - or it's client responsability to handle an instance - shared lock
public class Thor {

    // Reachability - call checkIfCachedDataToSend()
    // Queue


    public func log(_ payload: [String:Any], template: String, templateDictionary: [String:Any]) -> logStatus {

        var body =  [String:Any]()

        // Delegate on Queue
            // Retrieve template JSON Schema from UserDefaults

            // IF NOT FOUND download from server and save on UserDefaults

            // Create API JSON body
                // Enum JSON Schema and Load data from templateDictionary -> "key"
                    //body["key"] = templateDictionary["key"]
                // Add payload
                body["payload"] = payload

            // TRY TO SEND 
            if sendData(body, template: template) { 
                // checkIfCachedDataToSend()
                // Check REST response
                // return .Logged or .LoggedAsGeneric
            }
            else { 
                //NETWORK ERROR
                // ENTER LOCK
                    // OPEN CACHE FILE IN APPEND (CREATE IF NOT EXIST)
                    // WRITE SIZE OF JSON BODY + TEMPLATE
                    // WRITE TEMPLATE
                    // WRITE JSON BODY
                    // CLOSE CACHE FILE
                // LEAVE LOCK
                // return .Cached
            }

        return .Cached
    }

    // it doesn't check for duplication
    // delete the cache file only if all cached data is sent
    // if interrupted for example on a network error next time will resend data already in the cache file
    private func checkIfCachedDataToSend() {
        // OPEN CACHE FILE IN READ
            // WHILE DATA IN CACHE FILE
                // READ SIZE OF JSON BODY + TEMPLATE
                // READ TEMPLATE
                let template = "template"
                // READ JSON BODY
                let body = [String:Any]()
                // TRY TO SEND 
                if !sendData(body, template: template) {
                    return // break
                } 
        // CLOSE CACHE FILE
        // ENTER LOCK
            // DELETE CACHE FILE
        // LEAVE LOCK
    }

    private func sendData(_ body: [String:Any], template: String) -> Bool {
        // Alamofire call

        return true
    }
}

