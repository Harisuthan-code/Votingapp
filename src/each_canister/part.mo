import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

actor class Part(name : Text , userId : Principal , title : Text , description : Text , imgUrl : [Nat8] , startDate : Nat , endDate : Nat) = this{


public query func show_name():async Text{

    return name
};


public query func show_userid():async Principal{

    return userId
};

public query func show_title():async Text{

    return title
};

public query func show_description():async Text{

    return description
};
public query func show_img():async [Nat8]{

    return imgUrl
};

public query func start_date_show():async Nat{

    return startDate;
};

public query func enddate_show():async Nat{

    return endDate;
};


public query func id_get(): async Principal {

    return Principal.fromActor(this)
};





}