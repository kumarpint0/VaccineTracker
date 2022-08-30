
App={
    contract:{},
    init: async function(){
    console.log("init is called");
    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");

    await provider.send("eth_requestAccounts",[]);

    const signer = provider.getSigner();

    let userAddress = await signer.getAddress();
    
    document.getElementById("wallet").innerText= "Your wallet address is:"+ userAddress;
    const resourceAddress = "0xeD5d2f77b8031d8228Eec4F12351c017F5706202";

    console.log(userAddress);
    $.getJSON(
        "../artifacts/contracts/VaccineTracker.sol/VaccineTracker.json", function(VaccineTrackerArtifacts){
            console.log(VaccineTrackerArtifacts);

            const contract = new ethers.Contract(
                resourceAddress,
                VaccineTrackerArtifacts.abi, 
                signer
            );
            App.contract= contract;
            
            console.log(resourceAddress);
            contract.viewVaccine(1).then((data)=>{
                console.log(data);


            });
        });
        return App.bindEvents();

    },
    bindEvents: function(){
        $(document).on("click", ".btn_entity_add", App.handleAddparticipant);
        $(document).on("click", ".btn_add_vaccine", App.handleAddvaccine);
        $(document).on("click", ".btn_ParticipantView", App.handleViewParticipant);
        $(document).on("click", ".btn_view_vaccine", App.handleViewVaccine);
        $(document).on("click", ".btn_location", App.handleLocation);
        $(document).on("click", ".btn_Status", App.handleStatus);
    },
    handleAddparticipant:function(){
        console.log("handling participant registration");
        var userName= $("#userName").val();
        var participantAddress= $("#participantAddress").val();
        var participantType= $("#participantType").val();
        console.log(userName +" is "+participantType+ " with address "+participantAddress);
        App.contract.registerParticipant(userName,participantAddress,participantType); 
    },
    handleAddvaccine:function(){
        console.log("handling vaccine addition");
        var vaccineName=$("#vaccineName").val();
        var serialNumber=$("#serialNumber").val();
        var cost=$("#cost").val();
        var mfgTimeStamp=$("#mfgTimeStamp").val();

        console.log(vaccineName+" with serial number " +serialNumber+" cost "+cost+" manufactured at "+mfgTimeStamp);
        App.contract.addVaccine(vaccineName,serialNumber,cost);
    },
    handleViewParticipant:function(){ 
        console.log("handling view participant");
        var _participantId=$("#_participantId").val();
        console.log(_participantId);
        App.contract.viewParticipant(_participantId).then((data)=>{
            console.log(data);
            var addData = document.getElementById("myData");
            // console.log(addData);
            addData.innerHTML = `<strong>User Name</strong>: <span class="userName">`+data[0]+`</span><br />
             <strong>User Address</strong>: <span class="participantAddress">`+data[1]+`</span><br />
             <strong>User Type</strong></>: <span class="participantType">`+data[2]+`</span><br /`
            // console.log(data[0]);
        });
    },
    handleViewVaccine:function(){
        console.log("handling view vaccine");
        var _vaccine_id=$("#_vaccine_id").val();
        console.log(_vaccine_id);
        App.contract.viewVaccine(_vaccine_id).then((vaccineView)=>{
            console.log(vaccineView);

            var vaccineData= document.getElementById("vaccineData");

            vaccineData.innerHTML=` <strong>Vaccine Name</strong>: <span class="vaccineName">`+vaccineView[0]+`</span><br />
            <strong>Serial Number</strong>: <span class="serialNumber">`+vaccineView[1]+`</span><br />
            <strong>Cost </strong>: <span class="cost">`+vaccineView[2]+`</span><br />
            <strong>Date of Manufacturing </strong>: <span class="mfgTimeStamp">`+vaccineView[3]+`</span><br />
            <strong>Status of Vaccine </strong>: <span class="DefaultVaccineStatus">`+vaccineView[4]+`</span><br />`


        });
    },
    handleLocation:function(){
        console.log("handling location");
        App.contract.currentgeoLocation().then((locationData)=>{
            console.log(locationData); 
            var defaultLocation;
            if (locationData[1]==0){
                defaultLocation="Delhi";
            } else if (locationData[1]==1){
                defaultLocation="Mumbai";
            }else if (locationData[1]==2){
                defaultLocation="Hyderabad";
            }else if (locationData[1]==3){
                defaultLocation="Pune";
            }else if (locationData[1]==4){
                defaultLocation="Chennai";
            }

            var defaultStatus;
            if (locationData[0]==0){
                defaultStatus="Packed";
            } else if (locationData[0]==1){
                defaultStatus="Approved";
            }else if (locationData[0]==2){
                defaultStatus="Dispatched";
            }else if (locationData[0]==3){
                defaultStatus="Intransit";
            }else if (locationData[0]==4){
                defaultStatus="Fit";
            }else if (locationData[0]==5){
                defaultStatus="Unfit";
            }
            var location=document.getElementById("locationData");
            location.innerHTML=`<strong>Vaccine Status</strong>: <span class="status">`+defaultStatus+`</span><br />
            <strong>Vaccine location</strong>: <span class="location">`+defaultLocation+`</span><br />
            `
        })
    },
    handleStatus:function(){
        console.log("handling Status");
        App.contract.currentDefaultVaccineStatus().then((StatusData)=>{
            console.log(StatusData);
            var CurrentStatus;
            if (StatusData[0]==0){
                CurrentStatus="Packed";
            } else if (StatusData[0]==1){
                CurrentStatus="Approved";
            }else if (StatusData[0]==2){
                CurrentStatus="Dispatched";
            }else if (StatusData[0]==3){
                CurrentStatus="Intransit";
            }else if (StatusData[0]==4){
                CurrentStatus="Fit";
            }else if (StatusData[0]==5){
                CurrentStatus="Unfit";
            }
            var statusVaccine=document.getElementById("statusVaccine");
            statusVaccine.innerHTML=`<strong>Vaccine Status</strong>: <span class="status">`+CurrentStatus+`</span><br />`
        })
    }
}

$(function () {
    $(window).load(function () {
      App.init();
    });
  });