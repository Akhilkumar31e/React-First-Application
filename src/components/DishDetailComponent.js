import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,ModalHeader,ModalBody, Col,Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component {
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleComment =this.handleComment.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleComment(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId,values.rating, values.name, values.comment);
        }

        render(){
            return(
                <React.Fragment>
                <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-edit fa-lg"></span> Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Comment 
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less'
                                           
                                        }}>
                                    </Errors> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" type="textarea" id="comment" name="comment"
                                        placeholder="Type Comment Here"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit Comment
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </React.Fragment>
            );
        }
    }

    function RenderComments({comments, addComment, dishId}){
            if(comments!=null){
                const cmnts=comments.map((comment)=>{
                    return(
                        <div key={comment.id} className="list-unstyled">
                            <li>{comment.comment}</li><br></br>
                            <li>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li><br></br>
                        </div>
                    );
                });
                return(
                    <div>
                        <h4>Comments</h4>
                        {cmnts}
                        <CommentForm dishId={dishId} addComment={addComment}/>
                    </div>
                );
            }
            else{
                return(
                    <div></div>
                );
            }
    }
    function RenderDish({dish}){
        if(dish!=null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{ 
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        return (
            <div className="container">
                 <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
                        
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;