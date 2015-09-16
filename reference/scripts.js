var characters = "!@#$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

function changeCharacter() {
    var randomIndex = Math.floor(characters.length * Math.random());
    var randomCharacter = characters[randomIndex];
    $("#show-contact").text(randomCharacter);
}



function Contact(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
}

Contact.prototype.fullName = function() {
    return this.firstName + ' ' + this.lastName;
}

function Address(street, city, state, addressType) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.addressType = addressType;
}

Address.prototype.fullAddress = function() {
    return this.addressType + ": " + this.street + ", " + this.city + ", " + this.state;
}

function resetAddress() {
    $("input.new-street").last().val("");
    $("input.new-city").last().val("");
    $("input.new-state").last().val("");
    $("input.new-addressType").last().val("Home");
}

function resetFields() {
    $("input").val("");
}



//jQuery
$(document).ready(function(){

    $(".easter").mouseenter(changeCharacter);
    $(".easter").mouseleave(changeCharacter);

    $("#add-address").click(function(){
        $(".new-address").clone().last().appendTo('#new-addresses');
        resetAddress();
    });

    $("form#new-contact").submit(function(event){
        event.preventDefault();
        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();
        var newContact = new Contact (inputtedFirstName, inputtedLastName);


        $(".new-address").each(function(){
            var inputtedStreet = $(this).find("input.new-street").val();
            var inputtedCity = $(this).find("input.new-city").val();
            var inputtedState = $(this).find("input.new-state").val();
            var inputtedAddressType = $(this).find(".new-addressType").val();

            var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedAddressType);
            newContact.addresses.push(newAddress);

        $('body').on('mouseleave', '.contact', function(){
            alertify.error("Crash!!");
        });

        $('body').on('mouseenter', '.contact', function(){
            alertify.success("Vroom!!");
        });

            resetFields();

        });

        $("ul#contacts").append("<li><span class='contact'>" +
          newContact.fullName() + "</span></li>");

        $(".contact").last().click(function(){
            $("#show-contact").show();
            $("#show-contact h2").text(newContact.firstName);
            $(".first-name").text(newContact.firstName);
            $(".last-name").text(newContact.lastName);
                $("ul#addresses").text("");
            newContact.addresses.forEach(function(address){
                $("ul#addresses").append("<li>" + address.addressType + ": " + address.street + ", " + address.city + ", " + address.state + "</li>");

            });


        });

        $(".new-address").not(':first').remove();

    });
});
