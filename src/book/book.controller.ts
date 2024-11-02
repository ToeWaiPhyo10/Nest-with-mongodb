import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks() {
    return this.bookService.findAll();
  }
  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }
  @Get(':id')
  async getBook(@Param('id') id: string) {
    return this.bookService.findByid(id);
  }
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return this.bookService.updateById(id, book);
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteById(id);
  }
}
