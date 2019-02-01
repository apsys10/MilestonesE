pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    mapping(address=> address[]) deployed;
    
    
    function createCampaign(uint minimum , address forWho , string CampaignName , string des) public {
    address newCampaign = new Campaign(minimum , msg.sender , forWho , CampaignName  , des);
    deployedCampaigns.push(newCampaign);
    deployed[forWho].push(newCampaign);
    
}  

function getDeployedCampaigns() public view returns (address[])
{
    return deployedCampaigns;
}
function getMyCampaigns(address b) public view returns (address[])
{
    return deployed[b];
}


}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=> bool) approvals;
    }
    
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    address public beneficiary;
    string public title;
    string public purpose;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum , address creater , address forWho , string CampaignName , string des) public
    {
        manager = creater;
        minimumContribution = minimum;
        beneficiary= forWho;
        title= CampaignName;
        purpose= des;
        
    }
    function contribute() public payable
    {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
         Person memory newPerson = Person({
           addr: msg.sender,
           funds: msg.value
         });
         
         people.push(newPerson);
        
    }
    function createRequest(string description , uint value , address recipient) 
    public {
         Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
         });
         
         requests.push(newRequest);
        
    }
    function approveRequest(uint index) public
    {   Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender]= true;
        request.approvalCount++;
        
    }
    function finalizeRequest(uint index) public
    {   Request storage request = requests[index];  
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }
    function getSummary() public view returns (uint, uint, uint, uint, address, address, string, string)
    {
        return (minimumContribution,
        address(this).balance,
        requests.length,
        approversCount,
        manager,
        beneficiary,
        title,
        purpose);
    }
   
    function getRequestsCount() public view returns (uint)
    {
        return requests.length;
    }
    struct Person {
        address addr;
        uint funds;
    }
    
    Person[] public people;
    
    function getPeople()
        public view
        returns (address[], uint[])
    {
        address[] memory addrs = new address[](people.length);
        uint[]    memory funds = new uint[](people.length);
        
        for (uint i = 0; i < people.length; i++) {
            Person storage person = people[i];
            addrs[i] = person.addr;
            funds[i] = person.funds;
        }
        
        return (addrs, funds);
    }
   
}