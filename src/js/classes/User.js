export function User (data)
{
    this.id  =  data['id'] || "";
    this.login = data['login'] || "";
    this.name = data['name'] || "";
    this.firstname = data['firstname'] || "";
    this.lastname = data['lastname'] || "";
    this.position = data['position'] || "";
    this.email = data['email'] || "";
    this.permissions = data['permissions'] || {};
    this.roles = data['roles'] || {};

    let roles = {};
    for(let key in this.roles) {
        roles[key.toLowerCase()] = this.roles[key]
    }
    this.roles = roles;
}