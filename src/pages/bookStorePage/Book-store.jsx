// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import { useAuth } from '../../store/auth'



const BookStore = () => {

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const {API, authorizationToken} = useAuth();
  

 
    // get books from the backend
    
   
    const getBooks = async () =>{
      
      
     
          
      try {
  
        const response = await fetch(`${API}/api/bookstore/books?page=${currentPage}&limit=${itemsPerPage}`, {
          method: 'GET',
          headers: {
            Authorization: authorizationToken
           }
        })
        if(response.ok){
          const data = await response.json();
          // console.log('books data: ', data);
          setBooks(data.response || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.log(`Error is coming from frontend services: ${error}`)
      }
  }

  useEffect(()=>{
    getBooks();
  }, [currentPage])


  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <>
      <main className="main-content">
        <section className='recently-added'>
          <div className='header-name'>
            <div>
              <h2>Recently Added</h2>
              <small>our latest offers</small>
            </div>

            <div>     
              <span onClick={goToPrevPage} className={currentPage == 1 ? "disabled" : ""}>
                  &#8592;
              </span>
              
              <span onClick={goToNextPage} className={currentPage === totalPages ? "disabled" : ""}>
                  &#8594;
              </span>
            </div>
          </div>
          <div className='card-container'>
            <div>
              {books.map((currData, index)=>{
                const {title, author, image} = currData;
                return(
                  
                    <div className="book-card" key={index}>
                      <img src={image} alt="book cover" />
                      <div className='title-container'>
                        <p className='title'>{title}</p>
                        <p>{author}</p>
                      </div>
                    </div>
                  
                  
                )
              })}
            </div>

            <span>Page {currentPage} of {totalPages}</span>

          </div>

          
        </section>
      </main>
    </>
  )
}

export default BookStore