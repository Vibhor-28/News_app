import React , {useState, useEffect , createRef} from 'react';
import { Card, CardActionArea , CardActions , CardContent , CardMedia , Button , Typography } from '@mui/material';
import classNames  from 'classnames';
import styles from "./NewsCard.module.css"

const NewsCard = ({article : {description , publishedAt,source,title,url,urlToImage},i , activeArticle}) => {

  const[elRefs , setElRefs] = useState([]);

  const scrollToRef = (ref)=> window.scroll(0,ref.current.offsetTop - 50)

  useEffect(() => {
    setElRefs((refs)=> Array(20).fill().map((_,j)=> refs[j] || createRef()))
  }, [])

  useEffect(() => {
    if(i===activeArticle && elRefs[activeArticle])
      {
        scrollToRef(elRefs[activeArticle]);
      }
  }, [i,activeArticle,elRefs])
  
  
  return (
    < Card ref = {elRefs[i]}className={classNames(styles.card , activeArticle===i ? styles.activeCard:null)}>
        <CardActionArea href={url} target='_blank'>
            <CardMedia sx={{height:250}} image={urlToImage} />
            <div
             className={styles.details}
            >
                <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
            </div>
            <Typography gutterBottom variant="h5" sx={{padding: '0 16px',}}>{title}</Typography>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={styles.CardActions}>
            <Button size="small" color='primary'>Learn More</Button>
            <Typography variant="h5" color="textSecondary">{i+1}</Typography>
        </CardActions>
    </Card>
  )
}

export default NewsCard;