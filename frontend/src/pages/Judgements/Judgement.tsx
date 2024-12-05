import React, { useState } from "react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Judgements.css";

interface Judgement {
  regno: string;
  petitioner: string;
  respondent: string;
  padvocate: string;
  radvocate: string;
  subject: string;
  dod: string;
  case_type: string;
  dpdf: string;

}

interface Order {
  dol: string;
  dod: string;
  pdfname: string;
  pdf_url: string;
}

const Judgements: React.FC = () => {
  const [judgements, setJudgements] = useState<Judgement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [judgementDetails, setJudgementDetails] = useState<Judgement | null>(null);
  const [searchParams, setSearchParams] = useState<{
    [key: string]: string;
  }>({
    regno: "",
    petitioner: "",
    respondent: "",
    padvocate: "",
    radvocate: "",
    subject: "",
  });

  const defaultSearchParams = {
    regno: "",
    petitioner: "",
    respondent: "",
    padvocate: "",
    radvocate: "",
    subject: "",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchJudgements = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/judgements", {
        params: searchParams,
      });
      setJudgements(response.data);
    } catch (error) {
      console.error("Error fetching judgments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJudgements();
  };

  const handleReset = () => {
    setSearchParams(defaultSearchParams);
    setJudgements([]);
  };

  const handleViewOrders = async (regno: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/orders?regno=${encodeURIComponent(regno)}`
      );
      setOrders(response.data.interim_judgements);
      setModalTitle(`Orders for Reg No: ${regno}`);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (regno: string) => {
    console.log("Fetching details for Reg No:", regno);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/judgements/`, {
        params: { regno },
      });
      console.log("API Response:", response.data); // Log API response
  
      // If response data is an array, extract the first object
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      console.log("Judgement Details to Set:", data); // Log the data to set
  
      setJudgementDetails(data); // Update state
      setModalTitle(`Details for Reg No: ${regno}`);
      setDetailsModalVisible(true);
    } catch (error) {
      console.error("Error fetching judgement details:", error);
      setJudgementDetails(null);
    }
  };
  
  
  
  const closeModal = () => {
    setModalVisible(false);
    setOrders([]);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setJudgementDetails(null);
  };

  const renderWithTooltip = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) {
      return <span>{text}</span>;
    }
    return (
      <span className="tooltip-container">
        {text.slice(0, maxLength)}...
        <span className="tooltip-text">{text}</span>
      </span>
    );
  };

  const columns: TableColumn<Judgement>[] = [
    {
      name: "SNo.",
      cell: (_row, index) => <div>{index + 1}</div>,
      width: "80px",
    },
    {
      name: "Reg No",
      cell: (row) => {
        // Extract year from `dod` (assumed to be in format dd-mm-yyyy)
        const year = row.dod?.split("-")[2]; // Assuming `dod` is available in the row data
        const case_type = row.case_type; // Assuming `case_type` is available in the row data
  
        // Build the PDF URL using `row.dpdf`
        const baseUrl = `https://aftdelhi.nic.in/assets/judgement/${year}/${case_type}/`;
        const pdfUrl = baseUrl + encodeURIComponent(row.dpdf.trim());
  
        return (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {row.regno}
          </a>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Petitioner",
      cell: (row) => renderWithTooltip(row.petitioner),
      sortable: true,
    },
    {
      name: "Advocates",
      cell: (row) => (
        <span>
          {renderWithTooltip(`${row.padvocate} / ${row.radvocate}`)}
        </span>
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleViewOrders(row.regno)}
          >
            View Orders
          </Button>{" "}
          <Button
            variant="info"
            size="sm"
            onClick={() => handleViewDetails(row.regno)}
          >
            View Details
          </Button>
        </>
      ),
      width: "200px",
    },
  ];
  
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container">
        <div className="left-column">
          <form onSubmit={handleSearch}>
            <h6 className="form-title">Search Judgements</h6>
            <div className="form-grid">
              {[
                { placeholder: "Reg No", name: "regno" },
                { placeholder: "Petitioner", name: "petitioner" },
                { placeholder: "Respondent", name: "respondent" },
                { placeholder: "Padvocate", name: "padvocate" },
                { placeholder: "Radvocate", name: "radvocate" },
                { placeholder: "Subject", name: "subject" },
              ].map((field) => (
                <div key={field.name} className="form-group">
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={searchParams[field.name]}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              ))}
              <div className="form-group button-container">
                <button type="submit" className="search-button">
                  Search
                </button>
                <button type="button" className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="right-column">
          <div className="datatable-container">
            {loading ? (
              <div className="spinner-text">
                <div className="spinner"></div>
                Loading judgements...
              </div>
            ) : (
              <DataTable
                title="Judgements"
                columns={columns}
                data={judgements}
                pagination
                customStyles={{
                  headCells: {
                    style: {
                      backgroundColor: "#004080",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Modal for Viewing Orders */}
      <Modal show={modalVisible} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date Of Order</th>
                  <th>PDF File</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.dol}>
                    <td>{order.dol}</td>
                    <td>
                      <a href={order.pdf_url} target="_blank" rel="noopener noreferrer">
                        {order.pdfname}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No orders found for this judgment.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for Viewing Details */}
      <Modal show={detailsModalVisible} onHide={closeDetailsModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {judgementDetails ? (
            <div>
              <p><strong>Reg No:</strong> {judgementDetails.regno}</p>
              <p><strong>Petitioner:</strong> {judgementDetails.petitioner}</p>
              <p><strong>Respondent:</strong> {judgementDetails.respondent}</p>
              <p><strong>Padvocate:</strong> {judgementDetails.padvocate}</p>
              <p><strong>Radvocate:</strong> {judgementDetails.radvocate}</p>
              <p><strong>Subject:</strong> {judgementDetails.subject}</p>
            </div>
          ) : (
            <p>Details not found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default Judgements;
