import {downloadFile, getClientFiles} from "../../../api/api";
import {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import styled from "@emotion/styled";
import {Spinner} from "reactstrap";
import './RetrievedFiles.css'
const {useEffect} = require("react");

const RetrievedFiles = ({clientId}) => {
    const [clientFiles, setClientFiles] = useState([])
    useEffect(() => {
        const getAllClientFiles = () => {
            getClientFiles(clientId).then((data) => {
                const newFiles = [...clientFiles];
                if (data.data !== []) {
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
                            <FontAwesomeIcon icon={faFile}/>
                            <FileLink href={`/clients/${clientId}`} onClick={(e) =>
                                downloadFile(e, clientId, file)
                            }
                            >{file}</FileLink>
                        </MainLink>
                    </li>
                )}</ul>
            ) : (
                    <FilesWrapper>
                        <FileTitle>Loading files.. </FileTitle>
                        <Spinner actions={"border"} color={"success"} type="grow" size={"sm"}/>
                    </FilesWrapper>
                )
            }
        </Wrapper>
    )
}
export default RetrievedFiles;
const FileTitle = styled.h5`
  margin: 0 auto;
  text-align: center;
  padding-top: 2em;
`
const FilesWrapper = styled.div`
  margin: 0 auto;
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-height: 300px;
`
const MainLink = styled.div`
  margin: 0 1.2em;
  padding-right: 20em;
`
const FileLink = styled.a`
  padding: 0.5em;
`
