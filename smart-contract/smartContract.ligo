type id = string;

type user_details = {
  address: address,
  uid: string,
  pid: string
};

type product_details_inputs = {
  id: string,
  name: string,
  user_id: string,
  pid: string,
  owner: string,
  category: string,
  model: string,
  manufactureIn: string,
  createdIn: string,
  description: string,
  action: string,
};
type product_details = {
  id: string,
  name: string,
  user_id: string,
  pid: string,
  owner: string,
  claimRequest: string,
  category: string,
  model: string,
  manufactureIn: string,
  createdIn: string,
  description: string,
  action: string,
  parentIDs: list<string>,
  percentageUsed: list<string>,
  subParts: list<string>
};

type transfer = {
  id: string,
  new_owner: option<string>
};
type product_details_map = big_map<id, product_details>;

type storage = {
  users: big_map<id, user_details>,
  products: big_map<id, product_details>
};

type action =
| ["Create_product", product_details_inputs]
| ["Update_product", product_details]
| ["Get_details"];

let create_user = ([parameter, storage]: [user_details, storage]) : storage => {
  let user = {
    address: parameter.address,
    uid: parameter.uid,
    pid: parameter.pid
  };
  let updated_users = Big_map.update(parameter.uid, Some(user), storage.users);
    return  {
                users: updated_users,
                products : storage.products,
              };
}
let create_product = ([parameter, storage]: [product_details_inputs, storage]) : storage => {
    let temp: list<string> = list([]);
    let id = parameter.id;
    let products = storage.products;
    let create_product_obj = {
      id: parameter.id,
      name: parameter.name,
      user_id: parameter.user_id,
      pid: parameter.pid,
      owner: parameter.owner,
      claimRequest: "",
      category: parameter.category,
      model: parameter.model,
      manufactureIn: parameter.manufactureIn,
      createdIn: parameter.createdIn,
      description: parameter.description,
      action: "Created object successfully",
      parentIDs: temp,
      percentageUsed: temp,
      subParts: temp,
      // part_details: Big_map.empty,
    };
    let updated_products = Big_map.update(id, Some(create_product_obj), storage.products);
      return  {
                users: storage.users,
                products : updated_products,
              };
};

let update_product = ([parameter, storage]: [product_details, storage]) : storage => {
  let id = parameter.id;
  let products = storage.products;

  let updated_id_details: product_details = {
    id: id,
    name: parameter.name,
    user_id: parameter.user_id,
    pid: parameter.pid,
    owner: parameter.owner,
    claimRequest: parameter.claimRequest,
    category: parameter.category,
    model: parameter.model,
    manufactureIn: parameter.manufactureIn,
    createdIn: parameter.createdIn,
    description: parameter.description,
    action: parameter.action,
    parentIDs: parameter.parentIDs,
    percentageUsed: parameter.percentageUsed,
    subParts: parameter.subParts
  };
  let updated_products = Big_map.update(id, Some(updated_id_details), products);
  return    {
                users: storage.users,
                products : updated_products
            };
};

let get_details = (store :storage) : storage => store ;


let main = ([action, store  ]: [action, storage]) : [list<operation>, storage] => {
   return [(list([]) as list<operation>), match(action, {
                                                       Get_details : () => get_details(store),
                                                       Create_product: cd => create_product([cd, store]),
                                                       Update_product: ud => update_product([ud, store])
                                                       })
    ];
};  