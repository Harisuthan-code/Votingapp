import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Part "../each_canister/part";
import Cycles "mo:base/ExperimentalCycles";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Array "mo:base/Array";


actor main{


var yesCount : Nat = 0;
var noCount : Nat = 0;

private type Listing = {
  yes : Nat;
  no : Nat;
};

var votingcount = HashMap.HashMap<Principal , Listing>(1, Principal.equal , Principal.hash);
var ownerProps = HashMap.HashMap<Principal , List.List<Principal>>(1 , Principal.equal , Principal.hash);
var alreadyVoters = HashMap.HashMap<Principal , List.List<Principal>>(1 , Principal.equal , Principal.hash);
var listofPropsId : [Principal] = [];


public shared(msg) func add_propasal(name : Text , title : Text , description : Text , imgUrl : [Nat8] , startDate : Nat , endDate : Nat):async Text{

let ownerId : Principal = msg.caller;


Cycles.add <system> (4_000_000_000_000);
let new_props = await Part.Part(name , ownerId , title , description , imgUrl , startDate , endDate);

let canid : Principal = await new_props.id_get();

Debug.print(debug_show(canid));

add_canid(canid);

let final = await add_props(ownerId , canid);

if(final){

return "Sucessfully added to the Votings";

}

else{

  return "Not added";



}

};


public func add_props(ownerId : Principal  , canid : Principal) : async Bool{

  var data_show : List.List<Principal> = switch(ownerProps.get(ownerId)){
    case null List.nil<Principal>();
    case (?result) result;
  };

  data_show := List.push(canid , data_show);

  ownerProps.put(ownerId , data_show);


  return true

};


public query func show_owner_data(ownerId : Principal):async [Principal] {

var id_show : List.List<Principal> = switch(ownerProps.get(ownerId)){
case null List.nil<Principal>();
case (?result) result;

};

return List.toArray(id_show);

};


public func add_canid(canid : Principal){

  listofPropsId := Array.append<Principal>(listofPropsId , [canid]);


};


public query func show_all():async [Principal]{

  return listofPropsId;
};


public shared(msg) func getvote(canister_id: Principal, voteresult: Bool) {

    Debug.print(debug_show(canister_id));
    
    let currentListing = switch (votingcount.get(canister_id)) {
        case null {
            { yes = 0; no = 0 }
        };
        case (?result) result;
    };
    
    if (voteresult) {
        yesCount := yesCount + 1;
        votingcount.put(canister_id, { yes = currentListing.yes + 1; no = currentListing.no });

    } else {
        noCount := noCount + 1;
        votingcount.put(canister_id, { yes = currentListing.yes; no = currentListing.no + 1 });
    };

      var votedata : List.List<Principal> = switch(alreadyVoters.get(canister_id)){
      case null List.nil<Principal>();
      case (?result) result;

      };

      votedata := List.push(msg.caller , votedata);
      alreadyVoters.put(canister_id , votedata)

  
};


public query func votingability(canisterid : Principal):async [Principal]{

var votedata: List.List<Principal> = switch (alreadyVoters.get(canisterid)) {
case null List.nil<Principal>();
case (?result) result;
};

Debug.print(debug_show(List.toArray(votedata)));
return List.toArray(votedata);


};


public func getListing(can_id: Principal):async ?Listing {
  switch (votingcount.get(can_id)) {
    case (?listing) return ?listing; 
    case (_) return null; 
  }


}


}