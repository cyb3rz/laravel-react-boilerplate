import * as React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import { readShops, readLikes, addLike, removeLike } from '../../actions'
import { Stocks, Likes, Page } from '../../store/StoreTypes'

interface IProps {
  stocks: Stocks
  likes: Likes
  paging: Page
  readShops
  readLikes
  addLike
  removeLike
}

export class ShopTop extends React.Component<IProps> {
  componentDidMount(): void {
    // 商品データを取得する
    this.props.readShops()

    // お気に入りデータを取得する
    this.props.readLikes()
  }

  renderStocks(): JSX.Element {
    return _.map(this.props.stocks, (stock, index) => (
      <div className="block01_item" key={index}>
        <div className="text-right mb-2">
          <a href="#" onClick={
                e => {
                  e.preventDefault()
                  if ( stock.isLike ) {
                    this.props.removeLike(stock.id)
                  } else {
                    this.props.addLike(stock.id)
                  }
                }
              } className={`btn btn-sm ${stock.isLike ? 'btn-success' : 'btn-secondary'}`} data-id="{stock.id}">
            気になる
          </a>
        </div>
        <img src={`/uploads/stock/${stock.imgpath}`} alt="" className="block01_img" />
        <p>{stock.name}</p>
        <p className="c-red">{stock.price}</p>
        <p className="mb20">{stock.detail} </p>
        <form action="/shop/addcart" method="post">
          <input type="hidden" name="stock_id" value={stock.id} />

          {stock.quantity === 0 ? (
            <input type="button" value="カートに入れる（残り0個）" className="btn-gray" />
          ) : (
            <input type="submit" value={`カートに入れる（残り${stock.quantity}個）`} className="btn-01" />
          )}
        </form>
      </div>
    ))
  }

  renderPaging(): JSX.Element {

    const { total, current_page, last_page, first_page_url, prev_page_url, next_page_url, last_page_url } = this.props.paging

    return (
      <nav>
        <ul className="pagination">
          {prev_page_url ?
            <li className="page-item">
              <a className="page-link" rel="prev" aria-label="« 前へ" href={prev_page_url} onClick={
                e => {
                  e.preventDefault()
                  this.props.readShops(prev_page_url)
                }
              }>‹</a>
            </li>
            :
            <li className="page-item disabled" aria-disabled="true" aria-label="« 前へ">
              <span className="page-link" aria-hidden="true">‹</span>
            </li>
          }
          {(current_page === 1) ?
            <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
            :
            <li className="page-item" aria-current="page">
              <a className="page-link" href={first_page_url} onClick={
                e => {
                  e.preventDefault()
                  this.props.readShops(first_page_url)
                }
              }>1</a>
            </li>
          }
          {(2 <= last_page) ?
            (current_page === 1) ?
              <li className="page-item" aria-current="page">
                <a className="page-link" href={next_page_url} onClick={
                  e => {
                    e.preventDefault()
                    this.props.readShops(next_page_url)
                  }
                }>{current_page+1}</a>
              </li>
              :
              (current_page === last_page) ?
                <li className="page-item" aria-current="page">
                  <a className="page-link" href={prev_page_url} onClick={
                  e => {
                    e.preventDefault()
                    this.props.readShops(prev_page_url)
                  }
                }>{current_page-1}</a>
                </li>
                :
                <li className="page-item active" aria-current="page"><span className="page-link">{current_page}</span></li>
            : ''
          }
          {(3 <= last_page) ?
            (current_page === last_page) ?
              <li className="page-item active" aria-current="page"><span className="page-link">{last_page}</span></li>
              :
              <li className="page-item" aria-current="page">
                <a className="page-link"
                href={last_page_url} onClick={
                  e => {
                    e.preventDefault()
                    this.props.readShops(last_page_url)
                  }
                }>{last_page}</a>
              </li>
            : ''
          }
          {next_page_url ?
            <li className="page-item">
              <a className="page-link" rel="next" aria-label="次へ »"
              href={next_page_url} onClick={
                e => {
                  e.preventDefault()
                  this.props.readShops(next_page_url)
                }
              }>›</a>
            </li>
            :
            <li className="page-item disabled" aria-disabled="true" aria-label="次へ »">
              <span className="page-link" aria-hidden="true">›</span>
            </li>
          }
        </ul>
      </nav>
    )
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="contentsArea">
          <div id="link01" className="carousel slide mainBunner" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/front/image/bunner_01.jpg" alt="" />
              </div>
              <div className="carousel-item">
                <img src="/assets/front/image/bunner_02.jpg" alt="" />
              </div>
              <a className="carousel-control-prev" href="#link01" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#link01" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="">
            <div className="block01">{this.renderStocks()}</div>
            <div className="mt40">{this.renderPaging()}</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { total, current_page, last_page, first_page_url, prev_page_url, next_page_url, last_page_url, ...stocks } = state.stocks
  const likes = state.likes
  return {
    stocks: _.map(stocks.data, function(stock) {
      // 表示用にデータを加工
      return {
        ...stock,
        price: stock.price + '円',
        isLike: likes.data.includes(stock.id+''),
      }
    }),
    paging: {
      total: total,
      current_page: current_page,
      last_page: last_page,
      first_page_url: first_page_url,
      prev_page_url: prev_page_url,
      next_page_url: next_page_url,
      last_page_url: last_page_url,
    }
  }
}

const mapDispatchToProps = { readShops, readLikes, addLike, removeLike }

export default connect(mapStateToProps, mapDispatchToProps)(ShopTop)