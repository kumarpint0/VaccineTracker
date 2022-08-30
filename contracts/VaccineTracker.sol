//SPDX-License-Identifier:GPL-3.0

pragma solidity ^0.8.0;

contract VaccineTracker{
    uint256 public vaccine_id=0;
    uint256 public participant_id=0;
    address public owner;
   
    struct vaccine{
        string vaccineName;
        string serialNumber;
        uint256 cost;
        uint256 mfgTimeStamp;
        Status DefaultVaccineStatus;
    }
mapping (uint256 => vaccine) public vaccines;

    struct partitcipant{
        string userName;
        address participantAddress;
        string participantType;
    }
mapping (uint256 => partitcipant) public participants;

    struct Transit {
        string manufacturers;
        string logistics;
        string suppliers;
        string distributer;
        string hospitals;
    }
mapping(uint256=> Transit) public transit;

    enum Status{
        PACKAGED,
        APPROVED,
        DISPATCHED,
        INTRANSIT,
        UNFIT,
        FITFORUSE
    }
    Status public DefaultVaccineStatus=Status.PACKAGED;


    event changeDefaultVaccineStatus(Status);
    enum location{
        DELHI,
        MUMBAI,
        HYDERABAD,
        PUNE,
        CHENNAI
    }
    location public defaultgeolocation=location.DELHI;
    event changeGeoLocation(location);
    
    constructor()  {
        owner = msg.sender;
        }

function registerParticipant(
                string memory _username,
                address _participantAddress,
                string memory _participantType
                ) public returns(uint256){
                    uint256 participantId=participant_id++;
                    participants[participantId].userName= _username;
                    participants[participantId].participantAddress=_participantAddress;
                    participants[participantId].participantType=_participantType;

                    return participantId;

                }    


function addVaccine(
                    string memory _vaccineName,
                    string memory _serialNumber,
                    uint256 _vaccineCost)  public returns(uint256){
    uint256 vaccineId = vaccine_id++;
    vaccines[vaccineId].vaccineName = _vaccineName;
    vaccines[vaccineId].serialNumber= _serialNumber;
    vaccines[vaccineId].cost=_vaccineCost;
    vaccines[vaccineId].mfgTimeStamp=uint256(block.timestamp);
    vaccines[vaccineId].DefaultVaccineStatus;
    
    return vaccineId;
}



function viewParticipant(uint256 _participantId) public view returns(partitcipant memory){
    return participants[_participantId];
}
function userName(uint256 _participantId)public view returns(string memory){
    return participants[_participantId].userName;
}
function viewVaccine(uint256 _vaccine_id) public view returns(vaccine memory){
    return vaccines[_vaccine_id];
}

  function geoLocation(uint8 _status) public {
        //Functions to register the GeoLocation of vaccine in transit
        if (_status == 0) {
            DefaultVaccineStatus = Status.PACKAGED;
            defaultgeolocation=location.DELHI;
        } else if (_status == 1) {
            require(DefaultVaccineStatus == Status.PACKAGED);
            DefaultVaccineStatus = Status.APPROVED;
            defaultgeolocation=location.MUMBAI;
        } else if (_status == 2) {
            require(DefaultVaccineStatus == Status.APPROVED);
            DefaultVaccineStatus = Status.DISPATCHED;
            defaultgeolocation=location.HYDERABAD;
        } else if (_status == 3) {
            require(DefaultVaccineStatus == Status.DISPATCHED);
            DefaultVaccineStatus = Status.INTRANSIT;
            defaultgeolocation=location.PUNE;
        } else if (_status == 4) {
            require(DefaultVaccineStatus == Status.INTRANSIT);
            DefaultVaccineStatus = Status.UNFIT;
            defaultgeolocation=location.CHENNAI;
        } else if (_status == 5) {
            require(DefaultVaccineStatus == Status.UNFIT);
            DefaultVaccineStatus = Status.FITFORUSE;
            defaultgeolocation=location.CHENNAI;
        }

        emit changeDefaultVaccineStatus(DefaultVaccineStatus);
        emit changeGeoLocation(defaultgeolocation);
    }
function currentgeoLocation()public view returns(Status,location){
    return (DefaultVaccineStatus,defaultgeolocation);
}
function currentDefaultVaccineStatus() public view returns(Status) {
        //track vaccine status
        return DefaultVaccineStatus;
    }

}