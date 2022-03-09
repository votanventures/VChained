type id = int;

type id_details = {
  owner: address,
  controller: address,
  profile: string,
  name: string,
  model: string,
  category: string,
  description: string,           
  createdAt: string,
  manufacturedIn: string
};

type buy = {
  profile: string,
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
  new_profile: option<string>,
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

type create_details ={
    id: int,
    owner: address,
    controller: address,
    profile : string,
    name: string,
    model: string,
    category: string,
    description: string,
    createdAt: string,
    manufacturedIn: string
};

type product_details_map = big_map<id, product_details>;
type storage2 = big_map<id,product_details_map>;

type storage = {
  identities: big_map<id, id_details>,
  next_id: int,
};

type action =

| ["Update_owner", update_owner]
| ["Update_details", update_details]
| ["Create_details", create_details]
| ["Get_details"];

let create_details = ([parameter, storage]: [create_details, storage]) : storage => {
    let name = parameter.name;
    let model = parameter.model;
    let category = parameter.category;
    let description = parameter.description;
    let createdAt = parameter.createdAt;
    let owner=parameter.owner;
    let controller=parameter.controller;
    let manufacturedIn = parameter.manufacturedIn;
    let identities = storage.identities;
    let id = storage.next_id;
    let profile : string= parameter.profile;
    let create_details_obj: id_details = {
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
    let updated_identities = Big_map.update(id, Some(create_details_obj), identities);
            return      {
                           identities : updated_identities,
                           next_id : storage.next_id + 1,
                        };
    
    // let updated_identities :option <id_details>  = Big_map.add(id, Some(create_details_obj), identities);
    //     return {
    //             identities : updated_identities,
    //             next_id    : storage.next_id,
    //            };
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
  let profile: string =
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
    return  {
                identities : updated_identities,
                next_id : storage.next_id
            };
};

let get_details = (store :storage) : storage => store ;


let main = ([action, store  ]: [action, storage]) : [list<operation>, storage] => {
   return [(list([]) as list<operation>), match(action, {
                                                       Get_details : () => get_details(store),
                                                       Update_owner: uo => update_owner([uo, store]),
                                                       Create_details: cd => create_details([cd, store]),
                                                       Update_details: ud => update_details([ud, store])
                                                       })
    ];
};