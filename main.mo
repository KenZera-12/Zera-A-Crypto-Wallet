import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
actor Space{

    let password = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);
    let email = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);
    let name = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);
    let balance = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
    let avatar = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

    password.put("srbk-admin", "srbk");
    email.put("srbk-admin", "one.srbk@gmail.com");
    name.put("srbk-admin", "Saurabh Kansara");
    balance.put("srbk-admin", 1000000000);
    avatar.put("srbk-admin", "AV2");

    public func AddUser(tUser: Text,tName: Text, tMail: Text,tPass: Text, tAv: Text) {

        password.put(tUser, tPass);
        email.put(tUser, tMail);
        name.put(tUser, tName);
        balance.put(tUser, 0);
        avatar.put(tUser, tAv);
    };

    public query func Check(tUser: Text, tPass: Text): async Nat {
        
        let actualPass: Text = switch(password.get(tUser)) {
            case null "";
            case (?result) result;
        };
        
        if(actualPass == ""){
            return 0;
        }
        else{
            if(actualPass == tPass){
                return 1;
            }
            else{
                return 2;
            }
        }
    };

    public func Transfer(tSend: Text, tRec: Text, tAmt: Nat): async Nat {
        
        let sendBal: Nat = switch(balance.get(tSend)) {
            case null 0;
            case (?result) result;
        };

        let recBal: Nat = switch(balance.get(tRec)) {
            case null 0;
            case (?result) result;
        };

        if (sendBal >= tAmt){
            balance.put(tSend, sendBal - tAmt);
            balance.put(tRec, recBal + tAmt);
            return 0;
        }
        else{
            return 1;
        }
    };

    public query func GetBalance(tUser: Text): async Text{
        let bal: Nat = switch(balance.get(tUser)) {
            case null 0;
            case (?result) result;
        };

        let actualBalance = Nat.toText(bal);
        return actualBalance;
    };
    
    public query func GetEmail(tUser: Text): async Text{
        let actualEmail: Text = switch(email.get(tUser)) {
            case null "nouser";
            case (?result) result;
        };

        return actualEmail;
    };
    public query func GetAv(tUser: Text): async Text{
        let actualAv: Text = switch(avatar.get(tUser)) {
            case null "nouser";
            case (?result) result;
        };

        return actualAv;
    };
    public query func GetName(tUser: Text): async Text {
        let actualName: Text = switch(name.get(tUser)) {
            case null "";
            case (?result) result;
        };

        return actualName;
    };
    Debug.print("Success!");
}   