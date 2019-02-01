pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

contract CampaignFactory {
    address[] public deployedCampaigns;
    mapping(address=> address[]) deployed;
    

    
    function createCampaign(uint minimum , address payable forWho , string memory CampaignName , string memory des, uint goal) public {
    address newCampaign = address(new Campaign(minimum , msg.sender , forWho , CampaignName  , des , goal));
    deployedCampaigns.push(newCampaign);
    deployed[forWho].push(newCampaign);
    
}  


function getDeployedCampaigns() public view returns (address[] memory)
{
    return deployedCampaigns;
}
function getMyCampaigns(address b) public view returns (address[] memory)
{
    return deployed[b];
}

    
        
    
function remove(uint index) public  {
        if (index >= deployedCampaigns.length) return;

        for (uint i = index; i<deployedCampaigns.length-1; i++){
            deployedCampaigns[i] = deployedCampaigns[i+1];
        }
        deployedCampaigns.length--;
        
    }
    
}


contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address=> bool) approvals;
    }
    
    struct Milestone
    {
        string message;
        bool done;
    }
    
    struct Update
    {    string title;
        string message;
        
       
    }
    
    Update[] public updates;
    Milestone[] public milestones;
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    address payable public beneficiary;
    string public title;
    string public purpose;
    uint public goalAmt;
  
  
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum , address creater , address payable forWho , string memory CampaignName , string memory des, uint goal) public
    {
        manager = creater;
        minimumContribution = minimum;
        beneficiary= forWho;
        title= CampaignName;
        purpose= des;
        goalAmt= goal;
        
    }
    function contribute() public payable
    {
        require(msg.value >= minimumContribution);
        if(approvers[msg.sender]== true)
        {
          Person memory newPerson = Person({
           addr: msg.sender,
           funds: msg.value
         });
         
         people.push(newPerson);   
        }
        else{
             approvers[msg.sender] = true;
        approversCount++;
         Person memory newPerson = Person({
           addr: msg.sender,
           funds: msg.value
         });
         
         people.push(newPerson);  
        }
     
        
    }
    
   function createRequest(string memory description , uint value , address payable recipient) 
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
    function createMilestone(string memory about) public
    {
        Milestone memory newMilestone = Milestone(
            {
                message: about,
                done: false
            });
            
            milestones.push(newMilestone);
    }
    function createUpdate(string memory ttl, string memory upd) public
    {
        Update memory newUpdate = Update(
            {  title: ttl,
                message: upd
                
                
            });
            
            updates.push(newUpdate);
    }
    function getUpdateCount() public view returns (uint)
    {
        return updates.length;
    }
    function getMilestoneCount() public view returns (uint)
    {
        return milestones.length;
    }
    function approveRequest(uint index) public
    {   Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        //require(address(this).balance > request.value);
        
        request.approvals[msg.sender]= true;
        request.approvalCount++;
    
    }
    function finalizeRequest(uint index) public
    {   Request storage request = requests[index];  
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        request.recipient.transfer(request.value);
        request.complete = true;
        Transaction memory newTransaction = Transaction({
                to: request.recipient,
                amount:request.value
            });
            
            transactions.push(newTransaction);
        
    }
    function completeMilestone(uint index) public
    {
     Milestone storage milestone = milestones[index];
    milestone.done = true;
    }
    
    function getSummary() public view returns (uint, uint, uint, uint, address, address, string memory, string memory, uint)
    {
        return (minimumContribution,
        address(this).balance,
        requests.length,
        approversCount,
        manager,
        beneficiary,
        title,
        purpose,
        goalAmt);
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
        returns (address[] memory, uint[] memory)
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
   
   
  
     function destruct(address campaignaddr ,address payable to,  uint index ) public
    {   CampaignFactory factory =  CampaignFactory(campaignaddr);
     
     factory.remove(index);
        selfdestruct(to);
       
       
        
    }
     struct Transaction {
        
        address to;
        uint amount;
    }
    Transaction[] public transactions;

     function getTransactions()
        public view returns (address[] memory,uint[] memory) 
        {
           
            address[] memory to1 = new address[](transactions.length);
            uint[] memory amt1 = new uint[](transactions.length);
           
           for(uint i=0 ; i<transactions.length; i++){
                Transaction storage t = transactions[i];
                //sender1[i]= t.sender;
                to1[i] = t.to;
                amt1[i] = t.amount;
            }
           
          return (to1, amt1);
    }
    
   
}