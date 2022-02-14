type id = int;

type id_details = {
  owner: address,
  controller: address,
  profile: bytes,
  name: string,
  model: string,
  category: string,
  description: string,           
  createdAt: string,
  manufacturedIn: string
};

type buy = {
  profile: bytes,
  initial_controller: option<address>,
};

type update_owner = {
  id: id,
  new_owner: address,
  new_name: string,
  new_model: string,
  new_category: string,
  new_description: string,
  new_createdAt: string,
  new_manufacturedIn: string
};

type update_details = {
  id: id,
  new_profile: option<bytes>,
  new_controller: option<address>,
  new_name: option<string>,
  new_model: option<string>,
  new_category: option<string>,
  new_description: option<string>,
  new_createdAt: option<string>,
  new_manufacturedIn: option<string>
}

type product_details ={
  name: string,
  model: string,
  category: string,
  description: string,           
  createdAt: string,
  manufacturedIn: string

};

type action =
| ["Update_owner", update_owner]
| ["Update_details", update_details]
|["Get_details"];


type update = {
    txDate : string,
    txObj : id_details,  
};
type pMap  =  list<update>; 
type storage2 = big_map <id, pMap>;
type storage = {
  identities: big_map<id, id_details>,
  history : storage2,
  next_id: int,
};


//type product_details_map = big_map<id, product_details>;

let push_details=([parameter,updated_details,store]:[id,id_details,storage]):storage=>{
  let history : storage2 = store.history;
  let previous_list: pMap =
  match(Big_map.find_opt(parameter, history),{
      Some : pMap => pMap,
      None : ()=>(failwith("This ID does not exist.") as pMap )
   });
  let current_update :  update = {
      txDate : "14th feb",
      txObj : updated_details,
  };

  let larger_list: pMap = list([current_update, ...previous_list]);
  let updated_store2 : storage2 = Big_map.update (parameter , Some(larger_list), history) ;
  return {
      identities : store.identities,
      history : updated_store2,
      next_id: store.next_id,
  } ;

}; 



let update_owner = ([parameter, storage]: [update_owner, storage]) : storage => {
  let id : int = parameter.id;
  let new_owner = parameter.new_owner;
  let identities = storage.identities;
  let current_id_details: id_details =
    match (Big_map.find_opt(id, identities), {
      Some: id_details => id_details,
      None: () => (failwith("This ID does not exist.") as id_details)
    });

  if (sender != current_id_details.owner)
    { failwith("You are not the owner of this ID."); }

  let updated_id_details: id_details = {
    owner : new_owner,
    controller : current_id_details.controller,
    profile : current_id_details.profile,
    name: current_id_details.name,
    model: current_id_details.model,
    category: current_id_details.category,
    description: current_id_details.description,           
    createdAt: current_id_details.createdAt,
    manufacturedIn: current_id_details.manufacturedIn
  };
  let updated_identities = Big_map.update(id, Some(updated_id_details), identities);
  return                {
                           identities : updated_identities,
                           history : storage.history,
                           next_id : storage.next_id,
                        };
};

let update_details = ([parameter, storage]: [update_details, storage]) : storage => {
  if (amount != (0 as mutez)) {
    failwith("Updating details doesn't cost anything.");
  }
  let id = parameter.id;
  let new_profile = parameter.new_profile;
  let new_controller = parameter.new_controller;
  let identities = storage.identities;
  let current_id_details: id_details =
    match (Big_map.find_opt(id, identities), {
      Some: id_details => id_details,
      None: () => (failwith("This ID does not exist.") as id_details)
    });

  if ((sender != current_id_details.controller) &&
        (sender != current_id_details.owner)) {
      failwith ("You are not the owner or controller of this ID.");
  }

  let owner: address = current_id_details.owner;
  let profile: bytes =
    match (new_profile, {
      None: () =>  current_id_details.profile,
      Some: new_profile => new_profile
    });
  let controller: address =
    match (new_controller, {
      None: () =>current_id_details.controller,
      Some: new_controller => new_controller
    });
  let name: string = current_id_details.name;
  let model: string =  current_id_details.model;
  let category: string = current_id_details.category;
  let description: string = current_id_details.description;
  let createdAt: string = current_id_details.createdAt;
  let manufacturedIn: string = current_id_details.manufacturedIn;
    
  let updated_id_details: id_details = {
    owner : owner,
    controller : controller,
    profile : profile,
    name: name,
    model: model,
    category: category,
    description: description,           
    createdAt: createdAt,
    manufacturedIn: manufacturedIn
  };

  let updated_identities: big_map<id, id_details> =
    Big_map.update(id, Some(updated_id_details), identities);
    let storage2:storage = push_details(id,updated_id_details,storage);
    let new_storage:storage = {
                            identities : updated_identities,
                            history : storage2.history,
                            next_id : storage.next_id
                          };
  return       new_storage ;          
};

let get_details = (store :storage) : storage => store ;


let main = ([action, store  ]: [action, storage]) : [list<operation>, storage] => {
   return [(list([]) as list<operation>), match(action, {
                                                       Get_details : () => get_details(store),
                                                       Update_owner: uo => update_owner([uo, store]),
                                                       Update_details: ud => update_details([ud, store]),
                                                       
                                                       })
    ];
};