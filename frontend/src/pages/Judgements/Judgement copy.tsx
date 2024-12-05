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
}

interface Order {
  dol: string; // Date of order (assuming this is a string in your API response)
  dod: string; // Date of disposal
  pdfname: string; // Name of the PDF file
  pdf_url: string; // Add this property
}

const Judgements: React.FC = () => {
  const [judgements, setJudgements] = useState<Judgement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
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
    const encodedRegno = encodeURIComponent(regno);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/orders?regno=${regno}`
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

  const closeModal = () => {
    setModalVisible(false);
    setOrders([]);
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
    { name: "SNo.", cell: (_row, index) => <div>{index + 1}</div>, width: "80px" },
    { name: "Reg No", selector: (row) => row.regno, sortable: true, width: "150px" },
    { name: "Petitioner", cell: (row) => renderWithTooltip(row.petitioner), sortable: true },
    { name: "Respondent", cell: (row) => renderWithTooltip(row.respondent), sortable: true },
    { name: "Padvocate", cell: (row) => renderWithTooltip(row.padvocate), sortable: true },
    { name: "Radvocate", cell: (row) => renderWithTooltip(row.radvocate), sortable: true },
    { name: "Subject", cell: (row) => renderWithTooltip(row.subject), sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleViewOrders(row.regno)}
        >
          View Orders
        </Button>
      ),
      width: "150px",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch}>
        <h1 className="form-title">Search Judgements</h1>
        <div className="form-grid">
          {[{ label: "Reg No", name: "regno" },
            { label: "Petitioner", name: "petitioner" },
            { label: "Respondent", name: "respondent" },
            { label: "Padvocate", name: "padvocate" },
            { label: "Radvocate", name: "radvocate" },
            { label: "Subject", name: "subject" },
          ].map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}:</label>
              <input
                type="text"
                name={field.name}
                value={searchParams[field.name]}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          ))}
          <div className="form-group">
            <button type="submit" className="search-button">
              Search
            </button>
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>

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
    </motion.div>
  );
};

export default Judgements;
