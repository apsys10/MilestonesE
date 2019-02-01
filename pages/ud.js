export function Names(){
    return [
        {
            name: "John Smith",
            id: "1"
        },
        {
            name: "CampaignManager",
            id: "2"
        },
        {
            name: "Force10",
            id: "3"
        },
        {
            name: "Mahindra",
            id: "4"
        },
        {
            name: "Bajaj",
            id: "5"
        },
        {
            name: "Emisure Labs",
            id: "6"
        },
        {
            name: "AlphaPistons",
            id: "7"
        },
        {
            name: "Bharat Locomotive",
            id: "8"
        }
    ]
    
}


export function getNames(state, value) {
    return (
             state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    );
}