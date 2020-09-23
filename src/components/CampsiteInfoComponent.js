import React from 'react';
import { Card, CardImg, CardText, CardBody,  Breadcrumb, BreadcrumbItem, Button,Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';


    const required = val => val && val.length;
    const maxLength = len => val => !val || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);

    class CommentForm extends React.Component {
        constructor (props) {
            super(props);
            this.state = {
                isModalOpen: false,
                author:'',
                rating:'',
                text:'',
                touched: {
                    author: false,
                    rating: false,
                    text: false
                    
                }
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
              
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(event) {
            alert(`Rating: ${this.rating.value} Author: ${this.author.value} text: ${this.text.value}`);
            this.toggleModal();
            event.preventDefault();
        }
        

        render(){
            return(
            <React.Fragment> 
                <Button outline onClick={this.toggleModal}>
            <i className="fa fa-pencil fa-lg" /> Submit Comment
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select options="1-5" model= ".rating" id="rating"name= "rating"
                                placeholder= "select a number"
                                className="form-control"
                                validators={{
                                    required,
                                }}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name </Label>

                                <Control.text  model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                                    <Label htmlFor="text">Comment </Label>
                                    <Control.textarea row="6" model=".textarea" id="textarea" name="textarea" 
                                            placeholder="Leave a comment here.."
                                            className="form-control"
                                            validators={{
                                                required, 
                                                maxLength: maxLength(200)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".textarea"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                maxLength: 'Must be 100 characters or less'
                                            }}
                                        />
                            </FormGroup>
                           
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    
                    </ModalBody>
                </Modal>
                </Button>
            </React.Fragment>  

            );
        }
    }
        
        
  
    function RenderCampsite({campsite}) {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <Card >
                    <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                    <CardBody>
        <CardText>{campsite.description} </CardText>
                    </CardBody>
                </Card>
            </div>
        );
     }
     function RenderComments({comments}) {
        if(comments){
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                            <div key={comment.id} className ="m-3">
                                {comment.text}{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </div>
                        )
                    })}
                    <CommentForm/>
                </div> 
                
            )
        }  
    }

    function CampsiteInfo(props) {
        
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }

    export default CampsiteInfo;