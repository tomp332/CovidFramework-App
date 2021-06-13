import {getClientFiles} from "../../../api/api";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import styled from "@emotion/styled";

const {useEffect} = require("react");

const RetrievedFiles = ({clientId}) => {
    const [clientFiles, setClientFiles] = useState([])
    useEffect(() => {
        const getAllClientFiles = () => {
            getClientFiles(clientId).then((data) => {
                const newFiles = [...clientFiles];
                if(data.data !== []) {
                    data.data.map(file => newFiles.push(file))
                    setClientFiles(newFiles)
                }
            }).catch()
        }
        let handle = setInterval(getAllClientFiles, 2000);
        return () => {
            setClientFiles([])
            clearInterval(handle);
        };
    }, [clientId])
    return (
        <Wrapper>
            {clientFiles.length > 0 ? (
                <ul>{clientFiles.map((file) =>
                    <li>
                        <MainLink>
                            <FontAwesomeIcon icon={faFile} />
                            <FileLink target={'_blank'} href={`https://localhost:3000/clients/files/${clientId}/${file}`}>{file}</FileLink>
                        </MainLink>
                    </li>
                )}</ul>
            ) :(
                <h5>No client files have been downloaded yet.. </h5>
            )}
        </Wrapper>
    )
}
export default RetrievedFiles;

const Wrapper = styled.div`
    margin: 0 auto;
    padding-right: 2em;
`
const MainLink = styled.div`
  margin: 0 1.2em;
  padding-right: 20em;
`
const FileLink = styled.a`
  padding: 0.5em;
`
