import React,{useEffect,useState} from 'react';
import KycCard from './KycCard';
import KycShimmer from './KycShimmer';
import { fetchAllKyc,rejectKyc,acceptKyc } from '../../../services/Admin/apiMethods';


const PeopleList = () => {

   const [kycs,setKycs]=useState([])
   const [loading,setLoading]= useState(true)

   const handleReject = (kycId, reason) => {
    setLoading(true);
    rejectKyc(reason, kycId)
        .then((response) => {
           
            setKycs(prevKycs => prevKycs.filter(kyc => kyc._id !== kycId));
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
};

   
const handleAccept = (kycId) => {
    setLoading(true);
    acceptKyc(kycId)
        .then((response) => {
            setKycs(prevKycs =>
                prevKycs.map(kyc =>
                    kyc._id === kycId ? { ...kyc, actionTaken: true } : kyc
                )
            );
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
};

   useEffect(()=>{
    setLoading(true)
      fetchAllKyc()
       .then((response)=>{
        console.log('kyccc',response);
        setKycs(response)
        setLoading(false)
       })
       .catch(()=>{
        setLoading(true)
       })
   },[])

   if (loading) {
    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }, (_, index) => (
          <KycShimmer key={index} />
        ))}
      </ul>
    );
  }
  


  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kycs.map((kyc)=>{
            return   <KycCard kyc={kyc} handleReject={handleReject} handleAccept={handleAccept}/>
        })}
    
     
    </ul>
  );
}

export default PeopleList;
