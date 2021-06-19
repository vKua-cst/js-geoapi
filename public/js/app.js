$(document).ready(function() {
    let cpInput = $("[data-api=cp]")
    let villeInput = $("[data-api=ville")
    cpInput.on('keyup', function() {
    let cpValue = cpInput.val()
    if((cpValue.length == 2 || cpValue.length == 5) && (cpValue.length >= 2 && cpValue.length <= 5)) {
        let url = ''
        if(cpValue.length == 2 ) {
            url = 'https://geo.api.gouv.fr/departements/' + cpValue + '/communes'
        }
        if(cpValue.length == 5) {
            url = 'https://geo.api.gouv.fr/communes?codePostal=' + cpValue + '&boost=population'
        }
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                console.log(data)
                villeInput.html('')
                data.map((ville) => {
                    villeInput.append("<option value='" + ville.nom + "'>" + ville.nom + "</option>")
                })
            },
            error: function(request, error) {
                console.log(error)
            }
        })
    } else {
        if(cpValue.length < 2) {
            villeInput.html('')
            villeInput.append('<option value="null">Sélectionnez une ville</option>')
        }
    }
    })
})