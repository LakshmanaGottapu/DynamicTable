import { useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, Tooltip, Checkbox, InputNumber  } from "antd";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../utils/useFetch";
import "../../styles/formStyles.css";
import { formatDate } from "../../utils/dateUtils";
import { formatNumberToDecimal } from "../../utils/decimalNumberUtils";
import dayjs from 'dayjs';

function SPTEBookItemFormTab({
  form,
  rowData,
  onChangeRowData,
  disabled,
  selectedIEBookReqStatus,
  setSelectedIEBookReqStatus,
  openEBkReqStatusModalFN,

  selectedICoo,
  setSelectedICoo,
  openCooModalFN,

  selectedIBroker,
  setSelectedIBroker,
  openBrokerModalFN,

  selectedICategory,
  setSelectedICategory,
  openCategoryModalFN
}) {
  const { fetchAPI } = useFetch();

  useEffect(() => {}, []);

  const onReset = () => {
    form.resetFields();
  };

  const handleOpenEBkReqStatusModal = () => {
    openEBkReqStatusModalFN("ebookReqStatus item");
  };

  const handleOpenCooModal = () => {
    openCooModalFN("coo item");
  };

  const handleOpenBrokerModal = () => {
    openBrokerModalFN("broker item");
  };

  const handleOpenCategoryModal = () => {
    openCategoryModalFN("category item");
  };

  function getDateOrNull(value) {
    if (value != null) {
        return dayjs(value);
    }
    else {
        return null;
    }
}

  return (
    <>
      <Row className="title">eBook Item</Row>
      {/* <Container> */}
      <Row>
        <Col>
          <Form.Item label="eBook Ref Item:">
            <Input
              defaultValue={rowData.eBookRefItem}
              value={
                rowData.eBookRefItem !== undefined
                  ? rowData.eBookRefItem
                  : "0000"
              }
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Deletion Ind:">
            {/* <Checkbox></Checkbox> */}
            <Input
              defaultValue={rowData.deletionInd}
              value={rowData.deletionInd}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="File Name:">
            <Input
              defaultValue={rowData.fileName}
              onChange={(e) =>
                onChangeRowData({ ...rowData, fileName: e.target.value })
              }
              value={rowData.fileName}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="MDTS No / PO No:">
            {disabled === true ? (
              <Input
                defaultValue={rowData.mdtsNoPONo}
                value={rowData.mdtsNoPONo}
                disabled={disabled}
              />
            ) : (
              <Input
                defaultValue={rowData.mdtsNoPONo}
                onChange={(e) =>
                  onChangeRowData({ ...rowData, mdtsNoPONo: e.target.value })
                }
                value={rowData.mdtsNoPONo}
                disabled={disabled}
                maxLength={20}
              />
            )}
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="IPN">
            <Input
              defaultValue={rowData.ipn}
              onChange={(e) =>
                onChangeRowData({ ...rowData, ipn: e.target.value })
              }
              value={rowData.ipn}
              disabled={disabled}
              maxLength={18}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="VPN:" required>
            <Input
              defaultValue={rowData.vpn}
              onChange={(e) =>
                onChangeRowData({ ...rowData, vpn: e.target.value })
              }
              value={rowData.vpn}
              disabled={disabled}
              maxLength={35}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Item Desc 2:">
            <Input
              defaultValue={rowData.itemDesc2}
              onChange={(e) =>
                onChangeRowData({ ...rowData, itemDesc2: e.target.value })
              }
              value={rowData.itemDesc2}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Item Desc 3 (Eng):">
            <Input
              defaultValue={rowData.itemDesc3}
              onChange={(e) =>
                onChangeRowData({ ...rowData, itemDesc3: e.target.value })
              }
              value={rowData.itemDesc3}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>

      <hr></hr>

      <Row>
        <Col>
          <Form.Item label="Buyer / Requester:">
            <Input
              defaultValue={rowData.buyerRequestercode}
              onChange={(e) =>
                onChangeRowData({
                  ...rowData,
                  buyerRequestercode: e.target.value,
                })
              }
              value={rowData.buyerRequestercode}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Supplier Name:" required>
            <Input
              defaultValue={rowData.supplierName}
              onChange={(e) =>
                onChangeRowData({ ...rowData, supplierName: e.target.value })
              }
              value={rowData.supplierName}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="COO:">
            {disabled === true ? (
              <Input
                defaultValue={rowData.coo}
                value={rowData.coo}
                disabled={disabled}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  //defaultValue={rowData.coo}
                  onChange={(e) =>
                    onChangeRowData({
                      ...rowData,
                      coo: e.target.value,
                    })
                  }
                  value={selectedICoo}
                  maxLength={3}
                />
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  onClick={handleOpenCooModal}
                  style={{ marginLeft: "8px" }}
                />
              </div>
            )}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Declare UoM:">
            <Input
              defaultValue={rowData.declareUoM}
              onChange={(e) =>
                onChangeRowData({ ...rowData, declareUoM: e.target.value })
              }
              value={rowData.declareUoM}
              disabled={disabled}
              maxLength={3}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Unit Price:">
            <Input
              defaultValue={rowData.unitPrice !== undefined
                ? formatNumberToDecimal(rowData.unitPrice,3)
                : parseFloat("0.000")}
              onChange={(e) =>
                onChangeRowData({ ...rowData, unitPrice: e.target.value })
              }             
              value={
                rowData.unitPrice !== undefined
                  ? formatNumberToDecimal(rowData.unitPrice,3)
                  : parseFloat("0.000")
              }
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Currency:">
            <Input
              defaultValue={rowData.currencyKey}
              onChange={(e) =>
                onChangeRowData({ ...rowData, currencyKey: e.target.value })
              }
              value={rowData.currencyKey}
              disabled={disabled}
              maxLength={5}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Batch:">
            <Input
              defaultValue={rowData.batchNumber}
              onChange={(e) =>
                onChangeRowData({ ...rowData, batchNumber: e.target.value })
              }
              value={rowData.batchNumber}
              disabled={disabled}
              maxLength={10}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Category:">
            {/* <Input
              defaultValue={rowData.category}
              onChange={(e) =>
                onChangeRowData({ ...rowData, category: e.target.value })
              }
              value={rowData.category}
              disabled={disabled}
            /> */}

            {disabled === true ? (
              <Input
                defaultValue={rowData.category}
                value={rowData.category}
                disabled={disabled}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  //defaultValue={rowData.customsBroker}
                  onChange={(e) =>
                    onChangeRowData({
                      ...rowData,
                      category: e.target.value,
                    })
                  }
                  value={selectedICategory}
                  maxLength={20}
                />
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  onClick={handleOpenCategoryModal}
                  style={{ marginLeft: "8px" }}
                />
              </div>
            )}

          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Process Type:" required>
            {disabled === true ? (
              <Input
                defaultValue={rowData.processType}
                value={rowData.processType}
                disabled={disabled}
              />
            ) : (
              <Select
                defaultValue={rowData.processType}
                onChange={(e) =>
                  onChangeRowData({ ...rowData, processType: e })
                }
                value={
                  rowData.processType !== undefined
                    ? rowData.processType
                    : ""
                }
              >
                <Select.Option value="NEW">New eBook</Select.Option>
                <Select.Option value="RVSD">Revised eBook</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Broker:">
            {disabled === true ? (
              <Input
                defaultValue={rowData.customsBroker}
                value={rowData.customsBroker}
                disabled={disabled}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  //defaultValue={rowData.customsBroker}
                  onChange={(e) =>
                    onChangeRowData({
                      ...rowData,
                      customsBroker: e.target.value,
                    })
                  }
                  value={selectedIBroker}
                  maxLength={12}
                />
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  onClick={handleOpenBrokerModal}
                  style={{ marginLeft: "8px" }}
                />
              </div>
            )}
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Remark 1:">
            <Input
              defaultValue={rowData.remark1}
              onChange={(e) =>
                onChangeRowData({ ...rowData, remark1: e.target.value })
              }
              value={rowData.remark1}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Remark 2:">
            <Input
              defaultValue={rowData.remarK2}
              onChange={(e) =>
                onChangeRowData({ ...rowData, remarK2: e.target.value })
              }
              value={rowData.remarK2}
              disabled={disabled}
              maxLength={40}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Cstm Reg.Start Date:" >
            {disabled === true ? (<Input defaultValue={formatDate(rowData.cstmrgdtstrt)} value={formatDate(rowData.cstmrgdtstrt)} disabled={disabled} />) :
              (<DatePicker format="MM/DD/YYYY" defaultValue={getDateOrNull(rowData.cstmrgdtstrt)}
                value={getDateOrNull(rowData.cstmrgdtstrt)}
                onChange={(e) => onChangeRowData({ ...rowData, cstmrgdtstrt: e !== null ? e.format("MM/DD/YYYY") : null })
                }
              />)}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Cstm Reg.Compl Date:" >
            {disabled === true ? (<Input defaultValue={formatDate(rowData.cstmrgdtcmpl)} value={formatDate(rowData.cstmrgdtcmpl)} disabled={disabled} />) :
              (<DatePicker format="MM/DD/YYYY" defaultValue={getDateOrNull(rowData.cstmrgdtcmpl)}
                value={getDateOrNull(rowData.cstmrgdtcmpl)}
                onChange={(e) => onChangeRowData({ ...rowData, cstmrgdtcmpl: e !== null ? e.format("MM/DD/YYYY") : null })
                }
              />)}
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Upload to GTT Date:" >
            {disabled === true ? (<Input defaultValue={formatDate(rowData.gttuPloadDate)} value={formatDate(rowData.gttuPloadDate)} disabled={disabled} />) :
              (<DatePicker format="MM/DD/YYYY" defaultValue={getDateOrNull(rowData.gttuPloadDate)}
                value={getDateOrNull(rowData.gttuPloadDate)}
                onChange={(e) => onChangeRowData({ ...rowData, gttuPloadDate: e !== null ? e.format("MM/DD/YYYY") : null })
                }
              />)}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="GTT Complete Date:" >
            {disabled === true ? (<Input defaultValue={formatDate(rowData.gttCompleteDate)} value={formatDate(rowData.gttCompleteDate)} disabled={disabled} />) :
              (<DatePicker format="MM/DD/YYYY" defaultValue={getDateOrNull(rowData.gttCompleteDate)}
                value={getDateOrNull(rowData.gttCompleteDate)}
                onChange={(e) => onChangeRowData({ ...rowData, gttCompleteDate: e !== null ? e.format("MM/DD/YYYY") : null })
                }
              />)}
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Broker Transl Date:" >
            {disabled === true ? (<Input defaultValue={formatDate(rowData.brokerTranslationDate)} value={formatDate(rowData.brokerTranslationDate)} disabled={disabled} />) :
              (<DatePicker format="MM/DD/YYYY" defaultValue={getDateOrNull(rowData.brokerTranslationDate)}
                value={getDateOrNull(rowData.brokerTranslationDate)}
                onChange={(e) => onChangeRowData({ ...rowData, brokerTranslationDate: e !== null ? e.format("MM/DD/YYYY") : null })
                }
              />)}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Broker Valid Date:" >
            {disabled === true ? (<Input defaultValue={formatDate(rowData.brokerValidationDate)} value={formatDate(rowData.brokerValidationDate)} disabled={disabled} />) :
              (<DatePicker format="MM/DD/YYYY" defaultValue={getDateOrNull(rowData.brokerValidationDate)}
                value={getDateOrNull(rowData.brokerValidationDate)}
                onChange={(e) => onChangeRowData({ ...rowData, brokerValidationDate: e !== null ? e.format("MM/DD/YYYY") : null })
                }
              />)}
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="eBook Req Status:" required>
            {disabled === true ? (
              <Input
                defaultValue={rowData.eBookRequestStatus}
                value={rowData.eBookRequestStatus}
                disabled={disabled}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  //defaultValue={rowData.eBookRequestStatus}
                  onChange={(e) =>
                    onChangeRowData({
                      ...rowData,
                      eBookRequestStatus: e.target.value,
                    })
                  }
                  value={selectedIEBookReqStatus}
                  maxLength={2}
                />
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  onClick={handleOpenEBkReqStatusModal}
                  style={{ marginLeft: "8px" }}
                />
              </div>
            )}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Completion Date:">
            <Input
              defaultValue={
                rowData.completionDate !== undefined
                  ? formatDate(rowData.completionDate)
                  : null
              }
              value={
                rowData.completionDate !== undefined
                  ? formatDate(rowData.completionDate)
                  : null
              }
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      <Row>
        <Col>
          <Form.Item label="Validity Status:">
            {disabled === true ? (
              <Input
                defaultValue={rowData.validityStatus}
                value={
                  rowData.validityStatus !== undefined
                    ? rowData.validityStatus
                    : ""
                }
                disabled={true}
              />
            ) : (
              <Input
                defaultValue={rowData.validityStatus}
                value={
                  rowData.validityStatus !== undefined
                    ? rowData.validityStatus
                    : ""
                }
                disabled={true}
                maxLength={2}
              />
            )}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Created On:">
            {disabled === true ? (
              <Input
                defaultValue={
                  rowData.createDateTime !== undefined  && rowData.createDateTime !== null
                    ? formatDate(rowData.createDateTime)
                    : ""
                }
                value={
                  rowData.createDateTime !== undefined  && rowData.createDateTime !== null
                    ? formatDate(rowData.createDateTime)
                    : ""
                }
                disabled={true}
              />
            ) : (
              <Input
                defaultValue={
                  rowData.createDateTime !== undefined && rowData.createDateTime !== null
                    ? formatDate(rowData.createDateTime)
                    : null
                }
                value={
                  rowData.createDateTime !== undefined && rowData.createDateTime !== null
                    ? formatDate(rowData.createDateTime)
                    : null
                }
                disabled={true}
              />
            )}
          </Form.Item>
        </Col>
        <Col className="col-md-2"></Col>
      </Row>
      {/* </Container> */}
    </>
  );
}

export default SPTEBookItemFormTab;
