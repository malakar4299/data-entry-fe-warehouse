
import {
    Box,
    Grid,
    background
  } from "@chakra-ui/react"
import { Fragment } from "react"
import { BlobServiceClient } from "@azure/storage-blob";
import { useState } from "react";
import axios from "axios";
import Input from '@mui/material/Input';
import { Button, Typography } from "@mui/material";
const Main = () => {
    const blobServiceClient = new BlobServiceClient(
        "cDefaultEndpointsProtocol=https;AccountName=assg3cs519am811d;AccountKey=Y+7JrHrSaCcqlHKKiW6Ih3w5aaqm0ndy5DEZUjBri515sCQ4wF3YNpN38CVWovIsmCsRgj8XRMSi+AStWrPntQ==;EndpointSuffix=core.windows.net"
    );
    const [file, setFile] = useState(null);

    const handleFileChange = (event:any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        uploadImage("warehouse-images", file);
      };

    async function uploadImage(containerName:string, file:any) {
        const blobServiceClient = new BlobServiceClient(
            `https://assg3cs519am811d.blob.core.windows.net/?sp=racwdli&st=2023-04-15T01:10:11Z&se=2023-04-15T09:10:11Z&sv=2021-12-02&sr=c&sig=%2Bh6xjULQguO62b%2Bp4PpiuxJKPq811GPrgZnHcpFaWF0%3D`
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(file.name);
        const blockBlobClient = blobClient.getBlockBlobClient();
        const result = await blockBlobClient.uploadBrowserData(file, {
          blockSize: 4 * 1024 * 1024,
          concurrency: 20,
          onProgress: ev => console.log(ev)
        });
        console.log(result)
        axios.post('https://docker-assg-5-func.whitesand-2444b2f3.eastus.azurecontainerapps.io/api/HttpTrigger1?msg='+`https://assg3cs519am811d.blob.core.windows.net/warehouse-images/${file.name}`).then(res => {
            console.log(res)
        })
        console.log(`Upload of file '${file.name}' completed`);
      }


    return ( 
        <Fragment>
            <Box textAlign="center" minH={'100vh'} fontSize="xl" style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', background:'#000'}}>
                <Typography component={'h1'} sx={{fontWeight:'400', fontSize:'52px', fontFamily:'sans-serif', color:'#fff'}}>
                    WAREHOUSE MANAGEMENT
                </Typography>
                <Grid p={3}>
                    <form onSubmit={handleSubmit}>
                        {/* <Input type="file" onChange={handleFileChange} placeholder="Upload File"/>/ */}
                        <input style={{padding:'20px', color:'#fff'}} type="file" onChange={handleFileChange} />
                        <Button variant="outlined" type="submit">Upload Image</Button>
                    </form>
                </Grid>
                
            </Box>
      </Fragment>
     );
}
 
export default Main;